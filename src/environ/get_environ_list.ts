import baseURL from "../base_URL"
import get from "../request/get"
import convertJSONToCSV from "../utilities/convert_json_to_csv"
import environListParser, { IEnvironListItem } from "./environ_list_parser"

export type TOutputType = "csv" | "json"

export interface IGetEnvironListOptions {
    outputType: TOutputType
}

type TGetEnvironList = (options?: IGetEnvironListOptions) => Promise<IEnvironListItem[] | string>

const DBNAME = "ENVIRON"

const getEnvironList: TGetEnvironList = async (options = null) => {
    const outputType = options ? options.outputType : null
    const environList = await get({ url: `${baseURL}/list/${DBNAME}` })
    const parsedEntries = environListParser(environList)

    if (outputType === "csv") {
        // transform the data so it can be parsed to CSV
        const flattenEntries = parsedEntries
            .reduce((initial, entry) => {
                const { id, name } = entry
                return initial.concat(name.map((n) => ({ id, name: `${n.text}` })))
            }, [])
        return convertJSONToCSV(flattenEntries, [ "id", "name" ])
    }

    if (outputType === "json") {
        return JSON.stringify(parsedEntries)
    }

    return parsedEntries
}

export default getEnvironList
