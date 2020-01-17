export interface IBriteCancerogenEntry {
    code?: string
    name: string[] | string
    cancer_site?: string[]
    category: string
}

type TBriteCancerogensParser = (cancerogensList: string) => IBriteCancerogenEntry[]

const briteCancerogensParser: TBriteCancerogensParser = (cancerogensList) => {
    const identifiers = [ "B", "C" ]
    const entries = cancerogensList
        .split("\n")
        .filter((entry) => identifiers.includes(entry[ 0 ]))
    // .map((entry) => entry.substring(1).trim())

    const parsedEntries = []

    const parsers = {
        compounds(entry: string) {
            const result: any = {}
            const [ code, content ] = entry.split("  ")
            const [ name, sites ] = content.split("\t")

            result.name = name
            result.category = "compound"
            result.code = code

            if (sites !== undefined) {
                result.cancer_site = sites.split(", ")
            }

            return result
        },

        environment(entry: string) {
            const result: any = {}
            const [ name, sites ] = entry.split("\t")
            if (sites !== undefined) {
                result.cancer_site = sites.split(", ")
            }
            result.name = name
            result.category = "environment"

            return result
        },

        infections(entry: string) {
            const result: any = {}
            const [ name, sites ] = entry.split("\t")
            if (sites !== undefined) {
                result.cancer_site = sites.split(", ")
            }
            result.name = name
            result.category = "infection"

            return result
        },

        mixtures(entry: string) {
            const result: any = {}
            const [ name, sites ] = entry.split("\t")
            if (sites !== undefined) {
                result.cancer_site = sites.split(", ")
            }

            result.name = name
            result.category = "mixture"

            return result
        },

        others(entry: string) {
            const result: any = {}
            const [ name, sites ] = entry.split("\t")
            if (sites !== undefined) {
                result.cancer_site = sites.split(", ")
            }

            result.name = name
            result.category = "other"

            return result
        },

    }

    const machine = {
        add(entry: string) {
            if (this.state !== "idle") {
                parsedEntries.push(parsers[ this.state ](entry.substring(1).trim()))
            }
        },
        state: "idle",
    }

    for (let i = 0; i < entries.length; i++) {
        if (entries[ i ] === "B  Compounds") {
            machine.state = "compounds"
            continue
        } else if (entries[ i ] === "B  Exposure circimstances / Environment") {
            machine.state = "environment"
            continue
        } else if (entries[ i ] === "B  Infection") {
            machine.state = "infections"
            continue
        } else if (entries[ i ] === "B  Mixtures / Group of agents") {
            machine.state = "mixtures"
            continue
        } else if (entries[ i ] === "B  Others") {
            machine.state = "others"
            continue
        } else {
            machine.add(entries[ i ])
        }
    }

    return parsedEntries
}

export default briteCancerogensParser
