import { random } from "lodash"
import { get } from "./request/request"


const task = (url) => {
    console.log("New task with url:", url)

    setTimeout(async () => {
        const rawObject = await get({ url })
        console.log("Object:", rawObject.split("\n")[ 0 ])

        process.send({ msg: "ready" })
    }, random(1, 6) * 1000)
}

const messageFromMasterHandler = (data) => {
    const { msg, url } = data
    if (msg === "new") {
        task(url)
    }

    if (msg === "end") {
        process.exit()
    }
}

const childProcess = () => {
    process.on("message", messageFromMasterHandler)
}

export default childProcess
