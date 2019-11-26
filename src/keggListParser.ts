import drugNameParser from "./drugNameParser"

export const splitLine = (rawLine: string) => {
    const splitedRaw = rawLine.split("\t")
    return {
        content: splitedRaw[ 1 ].trim(),
        label: splitedRaw[ 0 ].trim(),
    }
}

export const parseLineContent = (rawLineContent: string) => {
    const splitedRawLineContent = rawLineContent.split(";")
    return splitedRawLineContent.map((rawDrugName) => drugNameParser(rawDrugName))
}

const keggListParser = (rawList: string) => {
    const trimmedRawList = rawList.trim() // removes \n,\t and whitespaces from both ends of the raw list
    const splittedLines = trimmedRawList.split("\n")

    const result = splittedLines.map((line) => {
        const { label, content } = splitLine(line)
        const splitedNames = parseLineContent(content)
        return {
            id: label,
            name: splitedNames,
        }
    })

    return result
}

export default keggListParser
