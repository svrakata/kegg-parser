import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_list"
import briteEndoDisruptiveCompsParser, { IBritreEndoDisruptiveCompsEntry } from "./brite_endocrine_disrupting_compounds_parser"

export type TOutputType = "csv" | "json"

interface IGetBriteEndoDisruptiveCompsOptions {
    outputType: TOutputType
}

// tslint:disable-next-line: max-line-length
type TGetEndoDisruptiveComps = (options?: IGetBriteEndoDisruptiveCompsOptions) => Promise<IBritreEndoDisruptiveCompsEntry[] | string>

const getEndoDisruptiveComps: TGetEndoDisruptiveComps = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08006"
    const endoDisruptiveCompsList = await getBriteCategoryList(briteID)
    const endoDisruptiveComps = briteEndoDisruptiveCompsParser(endoDisruptiveCompsList)

    if (outputType === "csv") {
        return convertJSONToCSV(endoDisruptiveComps, [ "name", "code" ])
    }

    if (outputType === "json") {
        return JSON.stringify(endoDisruptiveComps)
    }


    return endoDisruptiveComps
}

export default getEndoDisruptiveComps
