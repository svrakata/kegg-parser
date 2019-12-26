import environNameParser, { IEnvironName } from "./environ_name_parser"

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
        .reduce((accumulator, entryName) => {
            const nameVariations = entryName.split(", ")
            return accumulator.concat(nameVariations)
        }, [])
        .map((name) => environNameParser(name))
}

const environListParser = (list: string) => {
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

    return parsedEntries
}

export default environListParser
