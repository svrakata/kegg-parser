import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_category_list"
import britePesticidesParser, { IBritePesticideEntry } from "./brite_pesticides_parser"

export type TOutputType = "csv" | "json"

interface IGetBriteEndoDisruptiveCompsOptions {
    outputType: TOutputType
}

// tslint:disable-next-line: max-line-length
type TGetEndoDisruptiveComps = (options?: IGetBriteEndoDisruptiveCompsOptions) => Promise<IBritreEndoDisruptiveCompsEntry[] | string>

const getEndoDisrupticeComps: TGetEndoDisruptiveComps = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08006"
    const pesticidesList = await getBriteCategoryList(briteID)
    const endoDisruptiveComps = britePesticidesParser(pesticidesList)


    if (outputType === "csv") {
        return convertJSONToCSV(endoDisruptiveComps, [ "name", "code" ])
    }

    if (outputType === "json") {
        return JSON.stringify(endoDisruptiveComps)
    }


    return endoDisruptiveComps
}

export default getEndoDisrupticeComps
