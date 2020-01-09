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

import getCancerogens from "./brite/cancerogens/get_cancerogens"
import getEndoDisruptiveComps from "./brite/endocrine_disrupting_compounds/get_endocrine_disrupting_compounds"
import getHumanDiseases from "./brite/human_diseases/get_human_diseases"
import getMedicinalHerbs from "./brite/medicinal_herbs/get_medicinal_herbs"
import getPesticides from "./brite/pesticides/get_pesticides"
import getNaturalToxins from "./brite/toxins/get_natural_toxins"
import getEnvironList from "./environ/get_environ_list"

const load = async () => {
    const environList = await getEnvironList({ outputType: "csv" })
    // const naturalToxinsList = await getNaturalToxins({ outputType: "csv" })
    // const cancerogensList = await getCancerogens({ outputType: "csv" })
    // const pesticidesList = await getPesticides({ outputType: "csv" })
    // const endoDisruptiveCompsList = await getEndoDisruptiveComps({ outputType: "csv" })
    // const medicinalHerbsList = await getMedicinalHerbs()
    // tslint:disable-next-line: max-line-length
    // const herbsWriteStream = fs.createWriteStream(path.resolve(__dirname, "parsed_data", "medicinal_herbs_names_only.csv"))
    // herbsWriteStream.write(`"name"\n`)

    // the check for array comes in case the output is a csv string
    // if (Array.isArray(medicinalHerbsList)) {
    //     medicinalHerbsList.map((herb) => {
    //         herbsWriteStream.write(`"${herb.name}"\n`)
    //     })
    // }

    const humanDiseases = await getHumanDiseases({ outputType: "csv" })
    fs.writeFileSync(path.resolve(__dirname, "parsed_data", "human_diseases.csv"), humanDiseases)

    // fs.writeFileSync(path.resolve(__dirname, "temp_results", "environ_lkk.csv"), environList)

    // fs.writeFileSync(path.resolve(__dirname, "temp_results", "medicinal_herbs.csv"), medicinalHerbsList)
    // fs.writeFileSync(path.resolve(__dirname, "temp_results", "environ_list.csv"), environList)
    // fs.writeFileSync(path.resolve(__dirname, "temp_results", "natural_toxins.csv"), naturalToxinsList)
    // fs.writeFileSync(path.resolve(__dirname, "temp_results", "cancerogens.csv"), cancerogensList)
    // fs.writeFileSync(path.resolve(__dirname, "temp_results", "pesticides.csv"), pesticidesList)
    // fs.writeFileSync(
    // path.resolve(__dirname, "temp_results", "endocrine_disruptive_compounds.csv"), endoDisruptiveCompsList)
}

load()
