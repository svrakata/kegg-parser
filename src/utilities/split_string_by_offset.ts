interface ISplitedItem {
    label: string
    content: string
}

const splitStringByOffset = (str: string, offset: number): ISplitedItem => {
    return {
        content: str.slice(offset).trim(),
        label: str.slice(0, offset).trim(),
    }
}

export default splitStringByOffset
