import drugNameParser from "../environ/environ_name_parser"

const parseBriteLine = (line: string) => {
    let code = null
    let text = null
    let result: any = {}

    if (line.match(/^\d+ /)) {
        code = line.split(" ", 1)[ 0 ]
        line = line.replace(/^\d+ /, "")
        text = drugNameParser(line)
    } else {
        const splitByTwoSpaces = line.split(/  | \*/)
        if (splitByTwoSpaces.length > 1) {
            code = splitByTwoSpaces[ 0 ]
            text = drugNameParser(splitByTwoSpaces[ 1 ])
        } else {
            text = drugNameParser(line)
        }
    }

    result = text
    if (code) {
        result.code = code
    }

    return result
}

const parseIdentation = (line: string) => {
    let identation = 0

    for (const char of line) {
        if (char === " ") {
            identation++
            continue
        }
        break
    }

    return {
        identation,
        line: line.trim(),
    }
}

export const briteParser = (briteContent: string[]) => {
    const identations = briteContent.map(parseIdentation)
    const root: any = []
    let current = root

    for (let i = 0; i < identations.length - 1; i++) {
        const { identation, line } = identations[ i ]

        const node = {
            name: parseBriteLine(line),
        }
        current = root
        // skips if identation is 0
        // takes last element from root --> thats the new root
        // repeats until the parent is located
        for (let z = 1; z <= identation; z++) {
            if (Array.isArray(current) && current.length > 0) {
                current = current[ current.length - 1 ]
                if (current.hasOwnProperty("content")) {
                    current = current.content
                }
            }
        }
        if (current && Array.isArray(current)) {
            current.push(node)
        } else {
            current.content = [ node ]
        }
    }

    return root
}
