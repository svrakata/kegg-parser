export interface IBritreEndoDisruptiveCompsEntry {
    name: string[] | string
    code: string
}

type TBriteEndoDisruptiveCompsParser = (endoDisruptiveCompsList: string) => IBritreEndoDisruptiveCompsEntry[]

const briteEndoDisruptiveCompsParser: TBriteEndoDisruptiveCompsParser = (endoDisruptiveCompsList) => {
    const identifiers = [ "B", "C" ]
    const entries = endoDisruptiveCompsList.split("\n").filter((entry) => identifiers.includes(entry[ 0 ]))

    console.log(entries)


    return []
}

export default briteEndoDisruptiveCompsParser
