import cluster from "cluster"
import os from "os"
import keggListParser from "./keggListParser"
import { get } from "./request/request"
import generatorFrom from "./utilities/generatorFrom"


const workers = []
const numCPUs = os.cpus().length


const messageFromChildHandler = (data, worker, generator) => {
    const { msg } = data

    if (msg === "ready") {
        const { value, done } = generator.next()
        if (done) {
            endAll()
            return
        }

        worker.send({ msg: "new", url: `http://rest.kegg.jp/get/${value.id}` })
    }

    console.log(`Message from child with pid ${worker.process.pid}`, data)
}

const endAll = () => {
    workers.forEach((w) => {
        w.send({ msg: "end" })
    })
}

const masterProcess = async () => {
    let rawKeggList = null
    let parsedKeggList = null
    const keggListUrl = "http://rest.kegg.jp/list/ENVIRON"
    rawKeggList = await get({ url: keggListUrl })
    parsedKeggList = keggListParser(rawKeggList)

    const keggListGenerator = generatorFrom(parsedKeggList)

    for (let i = 0; i < numCPUs; i++) {
        const newWorker = cluster.fork()
        workers.push(newWorker)
        // subscribe for messages from children

        newWorker.on("message", (data) => {
            messageFromChildHandler(data, newWorker, keggListGenerator)
        })

        newWorker.on("online", () => {
            newWorker.send({ msg: "new", url: `http://rest.kegg.jp/get/${keggListGenerator.next().value.id}` })
        })

    }


    // setTimeout(() => {
    //     endAll()
    // }, 5000)

}

export default masterProcess
