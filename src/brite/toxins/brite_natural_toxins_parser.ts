export interface IBriteToxinEntry {
    code?: string
    name: string[]
}

type TBriteNaturalToxinsParser = (toxinsList: string) => IBriteToxinEntry[]

const briteNaturalToxinsParser: TBriteNaturalToxinsParser = (toxinsList: string) => {
    const categoriesIdentifiers = [ "A", "B", "C" ]
    const entryIdentifiers = [ "D" ]
    const categoriesFilter = [ "toxins", "Fumonisins", "venoms" ]

    const entries = toxinsList.trim().split("\n")
    const categories = entries
        .filter((entry) => categoriesIdentifiers.includes(entry[ 0 ]))
        .map((category) => {
            const name = category.substring(1).replace(/\(.+\)/gi, "").trim()
            return {
                code: "",
                name: [ name ],
            }
        })
        .filter(({ name }) => categoriesFilter
            .some((filterWord) => name[ 0 ].toLowerCase().indexOf(filterWord.toLowerCase()) > -1))
        .sort((a, b) => a.name[ 0 ].localeCompare(b.name[ 0 ]))

    const parsedEntries = entries
        .filter((entry) => entryIdentifiers.includes(entry[ 0 ]))
        .map((entry) => {
            const [ code, name ] = entry.substring(7).split("  ")
            return {
                code,
                name: name.split("; "),
            }
        })

    return [ ...parsedEntries, ...categories ]
}

export default briteNaturalToxinsParser
