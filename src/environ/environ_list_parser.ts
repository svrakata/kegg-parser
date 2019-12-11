import convertJSONToCSV from "../utilities/convert_json_to_csv"
import environNameParser, { IEnvironName } from "./environ_name_parser"
import { IGetEnvironListOutputType } from "./get_environ_list"

export interface IEnvironListItem {
    id: string
    name: IEnvironName[]
}

const splitEntry = (entry: string) => {
    const [ id, names ] = entry.split("\t")
    return {
        id: id.trim(),
        names: names.trim(),
    }
}

const parseEntryContent = (names: string) => {
    return names
        .split(";")
        .map((entryName) => environNameParser(entryName))
}

const environListParser = (list: string, outputType: IGetEnvironListOutputType) => {
    // get each new line as separate entry
    const entries = list.trim().split("\n")

    const parsedEntries = entries
        .map((entry) => {
            const { id, names } = splitEntry(entry)
            const entryNames = parseEntryContent(names)
            return {
                id,
                name: entryNames,
            }
        })

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

export default environListParser
