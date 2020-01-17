import getCancerogens from "./brite/cancerogens/get_cancerogens"
import getEndoDisruptiveComps from "./brite/endocrine_disrupting_compounds/get_endocrine_disrupting_compounds"
import getHumanDiseases from "./brite/human_diseases/get_human_diseases"
import getMedicinalHerbs from "./brite/medicinal_herbs/get_medicinal_herbs"
import getPesticides from "./brite/pesticides/get_pesticides"
import getNaturalToxins from "./brite/toxins/get_natural_toxins"
import getDrugsList from "./drug/get_drugs_list"
import keggObjectParser from "./environ/environ_entry_parser"
import keggListParser from "./environ/environ_list_parser"
import getEnvironList from "./environ/get_environ_list"

import fs, { write, WriteStream } from "fs"
import path from "path"
import getEssOils from "./brite/essential_oils/get_essential_oils"
import get from "./request/get"

// import get from "./request/get"

// const load = async () => {
// let rawKeggList = null
// let parsedKeggList = null
// const keggListUrl = "http://rest.kegg.jp/list/ENVIRON"
// const outFilePath = path.resolve(__dirname, "result", "result.json")
// const writeStream = fs.createWriteStream(outFilePath)

// writeStream.write("[")

// try {
//     rawKeggList = await get({ url: keggListUrl })
//     parsedKeggList = keggListParser(rawKeggList)

//     for await (const item of parsedKeggList) {
//         const keggObjectId = item.id
//         const keggObjectUrl = `http://rest.kegg.jp/get/${keggObjectId}`

//         const rawKeggObject = await get({ url: keggObjectUrl })
//         const keggObject = await keggObjectParser(rawKeggObject)

//         writeStream.write(JSON.stringify(keggObject))
//         writeStream.write(",")
//     }

//     writeStream.write("]")
//     writeStream.close()
// } catch (err) {
//     writeStream.close()
//     console.error(err)
// }
// }

// load()

const load = async () => {

    // tslint:disable-next-line: max-line-length
    // const herbsWriteStream = fs.createWriteStream(path.resolve(__dirname, "parsed_data", "medicinal_herbs_names_only.csv"))
    // herbsWriteStream.write(`"name"\n`)

    // the check for array comes in case the output is a csv string
    // if (Array.isArray(medicinalHerbsList)) {
    //     medicinalHerbsList.map((herb) => {
    //         herbsWriteStream.write(`"${herb.name}"\n`)
    //     })
    // }

    const essentialOils = await getEssOils({ outputType: "csv" })
    fs.writeFileSync(path.resolve(__dirname, "temp", "essential_oils.csv"), essentialOils)

    // const humanDiseases = await getHumanDiseases({ outputType: "csv" })
    // fs.writeFileSync(path.resolve(__dirname, "temp", "human_diseases.csv"), humanDiseases)

    // const environList = await getEnvironList({ outputType: "csv" })
    // fs.writeFileSync(path.resolve(__dirname, "temp", "environ_list.csv"), environList)

    // const medicinalHerbsList = await getMedicinalHerbs()
    // fs.writeFileSync(path.resolve(__dirname, "temp", "medicinal_herbs.csv"), medicinalHerbsList)

    // const naturalToxinsList = await getNaturalToxins({ outputType: "csv" })
    // fs.writeFileSync(path.resolve(__dirname, "temp", "natural_toxins.csv"), naturalToxinsList)

    // const cancerogensList = await getCancerogens({ outputType: "csv" })
    // fs.writeFileSync(path.resolve(__dirname, "temp", "cancerogens.csv"), cancerogensList)

    // const pesticidesList = await getPesticides({ outputType: "csv" })
    // fs.writeFileSync(path.resolve(__dirname, "temp", "pesticides.csv"), pesticidesList)

    // const endoDisruptiveCompsList = await getEndoDisruptiveComps({ outputType: "csv" })
    // fs.writeFileSync(
    //     path.resolve(__dirname, "temp", "endocrine_disruptive_compounds.csv"), endoDisruptiveCompsList)

    // getDrugsList({
    //     outputFolder: path.resolve(__dirname, "parsed_data"),
    //     outputType: "csv",
    // })

    // const filePath = path.resolve(__dirname, "temp", "medicinal_herbs.csv")
    // const writeStream = fs.createWriteStream(filePath)

    // try {
    //     const medHerbsList = await getMedicinalHerbs()
    //     const medHerbsCodes = medHerbsList.map((herb) => herb.code)
    //     const headers = `"id","name","category","components","majorComponent"\n`

    //     writeStream.write(headers)

    //     for await (const code of medHerbsCodes) {
    //         const keggObjectId = `ev:${code}`
    //         const keggObjectUrl = `http://rest.kegg.jp/get/${keggObjectId}`
    //         const rawKeggObject = await get({ url: keggObjectUrl })
    //         const keggObject = await keggObjectParser(rawKeggObject)

    //         const objCode = keggObject.entry.code
    //         const name = keggObject.name.text
    //         const category = keggObject.category && keggObject.category.text || ""
    //         const components = keggObject.component && keggObject.component.map((comp) => comp.text).join(";") || ""
    //         const majorComponents = keggObject.component && keggObject.component.find((comp) => comp.major)
    //         const parsedMajorComps = majorComponents && majorComponents.text.join(";") || ""

    //         const entry = `"${objCode}","${name}","${category}","${components}","${parsedMajorComps}"\n`

    //         writeStream.write(entry)
    //     }

    // } catch (err) {
    //     console.error(err)
    //     writeStream.close()
    // }
}

load()
