export interface IDBEntryName {
    code: string
    text: string[]
}

type TDBEntryNameParser = (dbEntryName: string) => IDBEntryName

const dbEntryNameParser: TDBEntryNameParser = (dbEntryName) => {
    let isCode = false
    let code = ""
    let text = ""
    const result: any = {
        text: "",
    }

    for (const char of dbEntryName) {
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

    result.text = text.trim()
    return result
}

export default dbEntryNameParser
