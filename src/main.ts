// import keggListParser from "./keggListParser"
// import keggObjectParser from "./keggObjectParser"

import fs from "fs"
import path from "path"

// import get from "./request/get"

// const load = async () => {
//     let rawKeggList = null
//     let parsedKeggList = null
//     const keggListUrl = "http://rest.kegg.jp/list/ENVIRON"
//     const outFilePath = path.resolve(__dirname, "result", "result.json")
//     const writeStream = fs.createWriteStream(outFilePath)

//     writeStream.write("[")

//     try {
//         rawKeggList = await get({ url: keggListUrl })
//         parsedKeggList = keggListParser(rawKeggList)

//         for await (const item of parsedKeggList) {
//             const keggObjectId = item.id
//             const keggObjectUrl = `http://rest.kegg.jp/get/${keggObjectId}`

//             const rawKeggObject = await get({ url: keggObjectUrl })
//             const keggObject = await keggObjectParser(rawKeggObject)

//             writeStream.write(JSON.stringify(keggObject))
//             writeStream.write(",")

//         }

//         writeStream.write("]")
//         writeStream.close()
//     } catch (err) {
//         writeStream.close()
//         console.error(err)
//     }
// }

// load()


import getEnvironList from "./environ/get_environ_list"

const load = async () => {
    const environList = await getEnvironList({ outputType: "csv" })
    fs.writeFileSync(path.resolve(__dirname, "temp_results", "environ_list.csv"), environList)


}

load()
