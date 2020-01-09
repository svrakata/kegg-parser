import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_category_list"
import briteHumanDiseasesParser, { IBriteHumanDiseasesEntry } from "./brite_human_diseases_parser"

type TOutputType = "csv" | "json"

interface IGetHumanDiseasesOptions {
    outputType: TOutputType
}

type TGetHumanDiseases = (options?: IGetHumanDiseasesOptions) => Promise<IBriteHumanDiseasesEntry[] | string>

const getHumanDiseases: TGetHumanDiseases = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08402"
    const cancerogensList = await getBriteCategoryList(briteID)
    const humanDiseasesEntries = briteHumanDiseasesParser(cancerogensList)

    if (outputType === "csv") {
        return convertJSONToCSV(
            humanDiseasesEntries
                .sort((a: any, b) => a.name.localeCompare(b.name)),
            [ "name" ],
        )
    }

    if (outputType === "json") {
        return JSON.stringify(humanDiseasesEntries)
    }

    return humanDiseasesEntries
}

export default getHumanDiseases
