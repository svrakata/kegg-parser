import cluster from "cluster"
import childProcess from "./child_process"
import masterProcess from "./master_process"

const initiate = () => {
    if (cluster.isMaster) {
        masterProcess()
    } else {
        childProcess()
    }
}

initiate()



// import keggListParser from "./keggListParser"
// import keggObjectParser from "./keggObjectParser"

// import { get } from "./request/request"

// const load = async () => {
//     let rawKeggList = null
//     let parsedKeggList = null
//     const keggListUrl = "http://rest.kegg.jp/list/ENVIRON"
//     try {
//         rawKeggList = await get({ url: keggListUrl })
//         parsedKeggList = keggListParser(rawKeggList)
//         parsedKeggList.forEach(async (item) => {
//             const keggObjectId = item.id
//             const keggObjectUrl = `http://rest.kegg.jp/get/${keggObjectId}`

//             try {
//                 const rawKeggObject = await get({ url: keggObjectUrl })
//                 // const keggObject = keggObjectParser(rawKeggObject)

//                 console.log(rawKeggObject)
//             } catch (err) {
//                 // console.error(err)
//             }

//         })


//     } catch (err) {
//         console.error(err)
//     }
// }

// load()
