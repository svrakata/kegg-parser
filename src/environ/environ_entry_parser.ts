import { briteParser } from "../entry_parsers/brite_parser"
import dblinksParser from "../entry_parsers/db_links_parser"
import environNameParser from "./environ_name_parser"
import alternativeNamesParser from "./major_comonent_additional_names_parser"

const keggObjectParser = async (rawKeggObject: string) => {
    const keggObject: any = {}
    let majorComponents = null

    let currentParsedLine: any = {}
    let lastContent = []
    const parsedLines = []
    const offset = 12
    const lines = rawKeggObject.trim().split("\n")

    for (const line of lines) {
        const label = line.substring(0, offset).trim()
        const content = line.substring(offset)
        if (label !== "") {
            lastContent = []
            currentParsedLine.label = label
            currentParsedLine.content = lastContent
            parsedLines.push(currentParsedLine)
            currentParsedLine = {}
        }

        lastContent.push(content)
    }

    for (const line of parsedLines) {
        const { content } = line
        const label = line.label.toLowerCase()
        switch (label) {
            case "entry": {
                const entryContent = content[ 0 ].split(/ +/g)
                keggObject[ label ] = {
                    code: entryContent[ 0 ],
                    text: entryContent[ 1 ],
                }
                continue
            }

            case "name": {
                keggObject[ label ] = environNameParser(content[ 0 ])
                continue
            }

            case "category": {
                keggObject[ label ] = environNameParser(content[ 0 ])
                continue
            }

            case "component": {
                const components = content[ 0 ].split(", ")
                keggObject[ label ] = components.map((component) => environNameParser(component))
                continue
            }

            case "source": {
                const components = content[ 0 ].split(",")
                keggObject[ label ] = components.map((component) => environNameParser(component))
                continue
            }

            case "remark": {
                keggObject[ label ] = content[ 0 ]
                continue
            }

            case "comment": {
                if (content[ 1 ] && content[ 1 ].includes("Major")) {
                    majorComponents = content[ 1 ]
                }
                keggObject[ label ] = content
                continue
            }

            case "brite": {
                keggObject[ label ] = briteParser(content)
                continue
            }

            case "dblinks": {
                keggObject[ label ] = dblinksParser(content)
                continue
            }

            case "///":
                continue

            default: {
                keggObject[ label ] = content
                // tslint:disable-next-line: max-line-length
                console.error(`The content of property "${label}" has not been parsed and is added raw to the KEGG object`)
                continue
            }
        }
    }

    if (keggObject.component) {
        const newComponents = []
        for await (const component of keggObject.component) {
            if (majorComponents && majorComponents.indexOf(component.code) > 0) {
                const names = await alternativeNamesParser(component.code)
                const newObj = Object.assign(component, { major: true, text: names })
                newComponents.push(newObj)
            } else {
                newComponents.push(Object.assign(component, { major: false }))
            }
        }

        keggObject.component = newComponents
    }

    console.log(`Keg entry with name: ${keggObject.name.text[ 0 ]} has been parsed.`)
    return keggObject
}

export default keggObjectParser
