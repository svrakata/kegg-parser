export interface IEnvironName {
    code: string
    text: string[]
}

type TEnvironNameParser = (environName: string) => IEnvironName

const environNameParser: TEnvironNameParser = (environName) => {
    let isCode = false
    let code = ""
    let text = ""
    const result: any = {
        text: "",
    }

    for (const char of environName) {
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

    // removes commas from some odd definitions in names that break the csv construction
    result.text = text.trim().replace(",", "")

    return result
}

export default environNameParser
