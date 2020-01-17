import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_list"
import briteMedcinalHerbsParser, { IBriteMedicinalHerbsEntry } from "./brite_medicinal_herbs_parser"

export type TOutputType = "csv" | "json"

interface IGetMedicinalHerbs {
    outputType: TOutputType
}

type TGetMedicinalHerbs = (
    options?: IGetMedicinalHerbs,
) => Promise<IBriteMedicinalHerbsEntry[]>

const getMedicinalHerbs: TGetMedicinalHerbs = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08322"
    const medicinalHerbsList = await getBriteCategoryList(briteID)
    const medHerbs = briteMedcinalHerbsParser(medicinalHerbsList)

    // if (outputType === "csv") {
    //     // flatten the components and add them to data. gonna need it
    //     return convertJSONToCSV(medHerbs, [ "name", "code", "components" ])
    // }

    // if (outputType === "json") {
    //     return JSON.stringify(medHerbs)
    // }

    return medHerbs
}

export default getMedicinalHerbs
