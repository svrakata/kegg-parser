import { briteParser } from "./briteParser"
import drugNameParser from "./drugNameParser"

const keggObjectParser = (rawKeggObject: string) => {
    const keggObject: any = {}
    const parsedLines = []
    let lastContent = []
    let currentParsedLine: any = {}
    const lines = rawKeggObject.trim().split("\n")
    let majorComponents = null

    for (const line of lines) {
        const label = line.substring(0, 12).trim()
        const content = line.substring(12)

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
                keggObject[ label ] = drugNameParser(content[ 0 ])
                continue
            }

            case "category": {
                keggObject[ label ] = drugNameParser(content[ 0 ])
                continue
            }

            case "component": {
                const components = content[ 0 ].split(",")
                keggObject[ label ] = components.map((component) => drugNameParser(component))
                continue
            }

            case "source": {
                const components = content[ 0 ].split(",")
                keggObject[ label ] = components.map((component) => drugNameParser(component))
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

            case "///":
                continue

            default: {
                keggObject[ label ] = content
                // tslint:disable-next-line: max-line-length
                console.error(`The content of property ${label} has not been parsed and is added raw to the KEGG object`)
                continue
            }
        }
    }

    if (majorComponents) {
        keggObject.component.map((component) => {
            if (majorComponents.indexOf(component.code) > 0) {
                return Object.assign(component, { major: true })
            }
            return Object.assign(component, { major: false })
        })
    }

    return keggObject
}

export default keggObjectParser
