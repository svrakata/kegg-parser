export interface IBriteEssOilsEntry {
    name: string[] | string
    code?: string
    components?: Array<{ name: string, code?: string }>
}

type TBriteEssOilsParser = (oilsList: string) => IBriteEssOilsEntry[]

const briteEssentialOilsParser: TBriteEssOilsParser = (oilsList: string) => {
    const categoriesIdentifiers = [ "A", "B" ]
    const entriesIdentifier = "C"
    const entries = oilsList
        .split("\n")

    const categories = entries
        .filter((entry) => categoriesIdentifiers.includes(entry[ 0 ]))
        .map((category) => {
            const name = category.substring(1).replace(/\(.+\)/gi, "").trim()
            return {
                name,
            }
        })
        .sort((a, b) => a.name.localeCompare(b.name))

    const parsedEntries = entries
        .filter((entry) => entriesIdentifier === entry[ 0 ])
        .map((entry) => {
            const mappedEntry: any = {}
            const [ code, fullName ] = entry
                .substring(1)
                .trim()
                .split("  ")

            const [ name, majorComponents ] = fullName.split("\t")

            if (majorComponents) {
                const majorComponentList = majorComponents
                    .split(", ")
                    .map((component) => {
                        const compCodes = component.match(/\[.+\]/gi)
                        const compName = component.split(" ", 1)[ 0 ]

                        return {
                            code: compCodes && compCodes[ 0 ].replace(/\[|\]/gi, "").split(" "),
                            name: compName,
                        }
                    })
                mappedEntry.components = majorComponentList
            }

            mappedEntry.name = name
            mappedEntry.code = code

            return mappedEntry
        })
        .sort((a, b) => a.name.localeCompare(b.name))
    return parsedEntries
}

export default briteEssentialOilsParser
