import dbEntryNameParser, { IDBEntryName } from "./db_entry_name_parser"

export interface IDBListItem {
    id: string
    name: IDBEntryName[]
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
        .reduce((accumulator, entryName) => {
            const nameVariations = entryName.split(", ")
            return accumulator.concat(nameVariations)
        }, [])
        .map((name) => dbEntryNameParser(name))
}

const dbListParser = (list: string) => {
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

    return parsedEntries
}

export default dbListParser
