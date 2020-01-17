import baseURL from "./base_URL"
import dbListParser, { IDBListItem } from "./db_list_parser"
import get from "./request/get"
import convertJSONToCSV from "./utilities/convert_json_to_csv"

export type TOutputType = "csv" | "json"

export interface IGetDBListOptions {
    outputType: TOutputType
    dbName: string
}

type TGetDBList = (options?: IGetDBListOptions) => Promise<IDBListItem[] | string>

const getDBList: TGetDBList = async (options = null) => {
    const { dbName } = options
    const outputType = options ? options.outputType : null
    const dbList = await get({ url: `${baseURL}/list/${dbName}` })
    const parsedEntries = dbListParser(dbList)

    if (outputType === "csv") {
        // transforms the data so it can be parsed to CSV
        const flattenEntries = parsedEntries
            .reduce((initial, entry) => {
                const { id, name } = entry
                return initial.concat(name.map((n) => ({ name: `${n.text}`, id })))
            }, [])
            .reduce((ini, entry) => {
                const { name, id } = entry
                if (!ini.some((item) => item.name === name)) {
                    ini.push({ name, id })
                }
                return ini
            }, [])
            .sort((a, b) => a.name.localeCompare(b.name))

        return convertJSONToCSV(flattenEntries, [ "name", "id" ])
    }

    if (outputType === "json") {
        return JSON.stringify(parsedEntries)
    }

    return parsedEntries
}

export default getDBList
