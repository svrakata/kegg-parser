export interface IBritreEndoDisruptiveCompsEntry {
    name: string[] | string
    code?: string
}

type TBriteEndoDisruptiveCompsParser = (endoDisruptiveCompsList: string) => IBritreEndoDisruptiveCompsEntry[]

const briteEndoDisruptiveCompsParser: TBriteEndoDisruptiveCompsParser = (endoDisruptiveCompsList) => {
    const categoriesIdentifiers = [ "A", "B" ]
    const compoundsIdentifier = "C"
    const entries = endoDisruptiveCompsList
        .split("\n")


    const categories = entries
        .filter((entry) => categoriesIdentifiers.includes(entry[ 0 ]))
        .map((category) => {
            const name = category.substring(1).trim()
            return {
                name,
            }
        })
        .sort((a, b) => a.name.localeCompare(b.name))



    const compounds = entries
        .filter((entry) => compoundsIdentifier === entry[ 0 ])
        .map((compound) => {
            const [ code, name ] = compound
                .substring(1)
                .trim()
                .split("  ")

            return {
                name: name.replace(/ \([a-zA-Z\s0-9]*\)/g, ""),
                code,
            }
        })
        .sort((a, b) => a.name.localeCompare(b.name))

    const endoDisruptiveCompsEntries = [ ...categories, ...compounds ]
    return endoDisruptiveCompsEntries
}

export default briteEndoDisruptiveCompsParser
