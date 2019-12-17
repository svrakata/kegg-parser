export interface IBriteMedicinalHerbsEntry {
    name: string[] | string
    code?: string
}

type TBriteMedicinalHerbsParser = (medicinalHerbs: string) => IBriteMedicinalHerbsEntry[]

const briteMedicinalHerbsParser: TBriteMedicinalHerbsParser = (medicinalHerbs) => {
    const categoriesIdentifiers = [ "A", "B" ]
    const compoundsIdentifier = "C"
    const entries = medicinalHerbs
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

    const compounds = entries
        .filter((entry) => compoundsIdentifier === entry[ 0 ])
        .map((compound) => {
            const mappedCompound: any = {}
            const [ code, fullName ] = compound
                .substring(1)
                .trim()
                .split("  ")

            const [ name, majorComponents ] = fullName.split("\t")

            if (majorComponents) {
                const majorComponentList = majorComponents
                    .split(", ")
                    .map((component) => {
                        const compCodes = component.match(/\[.+\]/gi)[ 0 ]
                        const compName = component.split(" ", 1)[ 0 ]

                        return {
                            name: compName,
                            code: compCodes.replace(/\[|\]/gi, "").split(" "),
                        }
                    })
                mappedCompound.components = majorComponentList
            }

            mappedCompound.name = name
            mappedCompound.code = code

            return mappedCompound
        })
        .sort((a, b) => a.name.localeCompare(b.name))

    const endoDisruptiveCompsEntries = compounds
    return endoDisruptiveCompsEntries
}

export default briteMedicinalHerbsParser
