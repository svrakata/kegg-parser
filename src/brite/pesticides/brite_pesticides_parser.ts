export interface IBritePesticideEntry {
    name: string[] | string
    code?: string
}

type TBritePesticidesParser = (pesticidesList: string) => IBritePesticideEntry[]

const britePesticidesParser: TBritePesticidesParser = (pesticidesList) => {
    const categoriesIdentifiers = [ "B", "C" ]
    const compoundsIdentifier = "D"
    const entries = pesticidesList.split("\n")
    const categories = entries
        .filter(
            (entry) => categoriesIdentifiers.includes(entry[ 0 ]),
        )

    const compounds = entries
        .filter(
            (entry) => entry[ 0 ] === compoundsIdentifier,
        )

    const parsedCategories = categories
        .map((category) => ({ name: category.substring(1).trim(), code: "" }))
        .filter((category) => ![ "other", "others" ].includes(category.name.toLowerCase()))
        .reduce((accum, category) => {
            const map = {}
            if (!map.hasOwnProperty(category.name)) {
                map[ category.name ] = 1
                accum.push(category)
            }
            return accum
        }, [])


    const parsedCompounds = compounds.map((compound) => {
        const [ code, name ] = compound
            .substring(1)
            .trim()
            .split("  ")
        return { name, code }
    })

    const parsedEntries = parsedCategories
        .concat(parsedCompounds)
        .sort((a, b) => a.name.localeCompare(b.name))

    return parsedEntries
}

export default britePesticidesParser
