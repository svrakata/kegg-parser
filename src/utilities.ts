interface ISplitedObject {
    label: string
    content: string
}

export const splitStringByOffset = (str: string, offset: number): ISplitedObject => {
    return {
        content: str.slice(offset).trim(),
        label: str.slice(0, offset).trim(),
    }
}

export const splitStringByChar = (str: string) => {
    const chars = /,|;/g
    return str.split(chars).map((item) => item.trim())
}
