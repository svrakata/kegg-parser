import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_category_list"
import { TOutputType } from "../toxins/get_natural_toxins"
import briteCancerogensParser, { IBriteCancerogenEntry } from "./brite_cancerogens_parser"

interface IGetCancerogensOptions {
    outputType: TOutputType
}

type TGetCancerogens = (options?: IGetCancerogensOptions) => Promise<IBriteCancerogenEntry[] | string>

const getCancerogens: TGetCancerogens = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08008"
    const cancerogensList = await getBriteCategoryList(briteID)
    const cancerogensEntries = briteCancerogensParser(cancerogensList)

    if (outputType === "csv") {
        return convertJSONToCSV(
            cancerogensEntries
                .sort((a: any, b) => a.name.localeCompare(b.name)),
            [ "name", "category", "code", "cancer_site" ]
        )
    }

    if (outputType === "json") {
        return JSON.stringify(cancerogensEntries)
    }

    return cancerogensEntries
}

export default getCancerogens
