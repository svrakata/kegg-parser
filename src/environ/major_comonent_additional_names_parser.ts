import get from "../request/get"

const alternativeNamesParser = async (componentID: string): Promise<string[]> => {
    const alternativeNames = []
    const componentCodes = componentID.split(":")[ 1 ].split(" ")
    if (componentCodes.length > 0) {
        for await (const code of componentCodes) {
            const keggComponentObjectUrl = `http://rest.kegg.jp/get/${code}`
            try {
                const names = []
                const rawComponentObject = await get({ url: keggComponentObjectUrl })
                const offset = 12
                const lines = rawComponentObject.trim().split("\n")
                for (let i = 0; i < lines.length; i++) {
                    let label = lines[ i ].substring(0, offset).trim()
                    let content = lines[ i ].substring(offset)

                    if (label === "NAME") {
                        while (true) {
                            label = lines[ i ].substring(0, offset).trim()
                            if (label !== "" && label !== "NAME") {
                                break
                            }

                            content = lines[ i ].substring(offset)
                            names.push(content.trim().replace(";", ""))

                            i++
                        }
                        break
                    }
                }
                alternativeNames.push(...names)
            } catch (err) {
                console.error(err)
            }
        }
    }
    // console.log(alternativeNames)
    return alternativeNames
}

export default alternativeNamesParser
