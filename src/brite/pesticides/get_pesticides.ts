import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_category_list"
import britePesticidesParser, { IBritePesticideEntry } from "./brite_pesticides_parser"

export type TOutputType = "csv" | "json"

interface IGetBritePesticidesListOptions {
    outputType: TOutputType
}

type TGetPesticides = (options?: IGetBritePesticidesListOptions) => Promise<IBritePesticideEntry[] | string>

const getPesticides: TGetPesticides = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08007"
    const pesticidesList = await getBriteCategoryList(briteID)
    const pesticidesEntries = britePesticidesParser(pesticidesList)


    if (outputType === "csv") {
        return convertJSONToCSV(pesticidesEntries, [ "name", "code" ])
    }

    if (outputType === "json") {
        return JSON.stringify(pesticidesEntries)
    }


    return pesticidesEntries
}

export default getPesticides
