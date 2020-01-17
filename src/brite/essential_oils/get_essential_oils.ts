import convertJSONToCSV from "../../utilities/convert_json_to_csv"
import getBriteCategoryList from "../get_brite_list"
import briteEssentialOilsParser, { IBriteEssOilsEntry } from "./brite_essential_oils_parser"

type TOutputType = "csv" | "json"

interface IGetEssOilsOptions {
    outputType: TOutputType
}

type TGetEssentialOils = (options?: IGetEssOilsOptions) => Promise<IBriteEssOilsEntry[] | string>

const getEssOils: TGetEssentialOils = async (options = null) => {
    const outputType = options ? options.outputType : null
    const briteID = "br:br08321"
    const oilsList = await getBriteCategoryList(briteID)
    const essOilsEntries = briteEssentialOilsParser(oilsList)

    if (outputType === "csv") {
        return convertJSONToCSV(
            essOilsEntries
                .map(({ name, code, components }) => ({
                    code,
                    majorComponents: components && components.map((comp) => comp.name).join(";") || "",
                    name,
                }))
                .sort((a: any, b) => a.name.localeCompare(b.name)),
            [ "name", "code", "majorComponents" ],
        )
    }

    if (outputType === "json") {
        return JSON.stringify(essOilsEntries)
    }

    return essOilsEntries
}

export default getEssOils
