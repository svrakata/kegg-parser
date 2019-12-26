import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_category_list"
import briteMedcinalHerbsParser, { IBriteMedicinalHerbsEntry } from "./brite_medicinal_herbs_parser"

export type TOutputType = "csv" | "json"

interface IGetMedicinalHerbs {
    outputType: TOutputType
}

type TGetEndoDisruptiveComps = (
    options?: IGetMedicinalHerbs
) => Promise<IBriteMedicinalHerbsEntry[] | string>

const getMedicinalHerbs: TGetEndoDisruptiveComps = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08322"
    const endoDisruptiveCompsList = await getBriteCategoryList(briteID)
    const endoDisruptiveComps = briteMedcinalHerbsParser(endoDisruptiveCompsList)

    if (outputType === "csv") {
        // flatten the components and add them to data. gonna need it
        return convertJSONToCSV(endoDisruptiveComps, [ "name", "code", "components" ])
    }

    if (outputType === "json") {
        return JSON.stringify(endoDisruptiveComps)
    }

    return endoDisruptiveComps
}

export default getMedicinalHerbs
