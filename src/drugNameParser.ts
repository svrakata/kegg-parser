const drugNameParser = (rawDrugName: string) => {
    let isCode = false
    let code = ""
    let text = ""
    const result: any = {
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

    result.text = text.trim().split(",")

    return result
}

export default drugNameParser
