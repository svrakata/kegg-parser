interface IKEGGName {
    code?: string
    text: string
}

export const splitLine = (rawLine: string) => {
    const splitedRaw = rawLine.split("\t")
    return {
        content: splitedRaw[ 1 ].trim(),
        label: splitedRaw[ 0 ].trim(),
    }
}

export const parseDrugName = (rawDrugName: string) => {
    let isCode = false
    let code = ""
    let text = ""
    const result: IKEGGName = {
        text: "",
    }

    for (const char of rawDrugName) {
        if (char === "(" || char === "[") {
            isCode = true
            continue
        }

        if (char === ")" || char === "]") {
            isCode = false
            continue
        }

        if (isCode) {
            code += char
        } else {
            text += char
        }
    }

    if (code.length > 0) {
        result.code = code
    }

    result.text = text

    return result
}


export const parseLineContent = (rawLineContent: string) => {
    const splitedRawLineContent = rawLineContent.split(";")
    return splitedRawLineContent.map((rawDrugName) => parseDrugName(rawDrugName))
}


export const parseList = (rawList: string) => {
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
