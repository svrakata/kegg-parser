export interface IBritePesticideEntry {
    name: string[] | string
    code?: string
}

type TBritePesticidesParser = (pesticidesList: string) => IBritePesticideEntry[]

const britePesticidesParser: TBritePesticidesParser = (pesticidesList) => {
    const categoriesIdentifiers = [ "B", "C" ]
    const compoundsIdentifier = "D"
    const entries = pesticidesList.split("\n")
    const categories = entries.filter((entry) => categoriesIdentifiers.includes(entry[ 0 ]))
    const compounds = entries.filter((entry) => entry[ 0 ] === compoundsIdentifier)

    const parsedCategories = categories.map((category) => ({ name: category.substring(1).trim() }))
    const parsedCompounds = compounds.map((compound) => {
        const [ code, name ] = compound.substring(1).trim().split("  ")
        return { name, code }
    })

    const parsedEntries = parsedCategories.concat(parsedCompounds).sort((a, b) => a.name.localeCompare(b.name))
    return parsedEntries
}

export default britePesticidesParser
