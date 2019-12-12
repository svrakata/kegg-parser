import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_category_list"
import briteNaturalToxinsParser, { IBriteToxinEntry } from "./brite_natural_toxins_parser"

export type TOutputType = "csv" | "json"

interface IGetBriteNaturalToxinsListOptions {
    outputType: TOutputType
}

type TGetNaturalToxins = (options?: IGetBriteNaturalToxinsListOptions) => Promise<IBriteToxinEntry[] | string>

const getNaturalToxins: TGetNaturalToxins = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08009"
    const toxinsList = await getBriteCategoryList(briteID)
    const naturalToxinsEntries = briteNaturalToxinsParser(toxinsList)


    if (outputType === "csv") {
        const flattedEntries = naturalToxinsEntries
            .map((entry: any) => {
                entry.name = entry.name.join(",")
                return entry
            })
            // returns only categories
            // .filter((entry) => !entry.code)
            .sort((a, b) => a.name.localeCompare(b.name))


        return convertJSONToCSV(flattedEntries, [ "name", "code" ])
    }

    if (outputType === "json") {
        return JSON.stringify(naturalToxinsEntries)
    }


    return naturalToxinsEntries
}

export default getNaturalToxins
