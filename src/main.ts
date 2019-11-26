import keggListParser from "./keggListParser"
import keggObjectParser from "./keggObjectParser"
import { getDocument } from "./request"

import fs from "fs"
import path from "path"

import { promisify } from "util"

const write = promisify(fs.writeFile)

const load = async () => {
    const keggListUrl = "http://rest.kegg.jp/list/ENVIRON"
    const rawKeggList = await getDocument(keggListUrl)
    const parsedKeggList = keggListParser(rawKeggList)

    parsedKeggList.forEach(async ({ id }) => {
        const keggObjectUrl = `http://rest.kegg.jp/get/${id}`
        const rawKeggObject = await getDocument(keggObjectUrl)


        console.log(rawKeggObject)
        // const parsedKeggObject = keggObjectParser(rawKegObject)
        // const filename = `${id}.json`

        // await write(path.resolve(__dirname, "keggObjects", filename), JSON.stringify(parsedKeggObject))
    })
}

load()


