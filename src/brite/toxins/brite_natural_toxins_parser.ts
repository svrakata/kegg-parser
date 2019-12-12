export interface IBriteToxinEntry {
    code?: string
    name: string[]
}

type TBriteNaturalToxinsParser = (toxinsList: string) => IBriteToxinEntry[]

const briteNaturalToxinsParser: TBriteNaturalToxinsParser = (toxinsList: string) => {
    let entries = toxinsList.trim().split("\n")

    entries = entries.slice(2, entries.length)
    entries = entries.slice(0, entries.indexOf("!"))

    const parsedEntries = entries
        .map((entry) => {
            if (entry[ 0 ] === "D") {
                const [ code, name ] = entry.substring(7).split("  ")
                return {
                    code,
                    name: name.split("; "),
                }
            } else {
                return {
                    name: entry.substring(1).trim().split("; "),
                }
            }
        })

    return parsedEntries
}

export default briteNaturalToxinsParser
