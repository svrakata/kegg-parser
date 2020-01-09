import environNameParser from "../../environ/environ_name_parser"

export interface IBriteHumanDiseasesEntry {
    code?: string
    name: string[] | string
}

type TBriteHumanDiseasesParser = (diseasesList: string) => IBriteHumanDiseasesEntry[]

const briteHumanDiseasesParser: TBriteHumanDiseasesParser = (diseasesList) => {
    const indentifiers = [ "C" ]
    const entries = diseasesList
        .split("\n")
        .filter((entry) => indentifiers.includes(entry[ 0 ]))
        .map((filtEntry) => ({
            name: environNameParser(
                filtEntry
                    .toLowerCase()
                    .substring(1)
                    .trim()
                    .split("  ")[ 1 ],
            ).text,
        }))
    return entries
}

export default briteHumanDiseasesParser
