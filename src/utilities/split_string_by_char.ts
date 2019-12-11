const splitStringByChar = (str: string) => {
    const chars = /,|;/g
    return str.split(chars).map((item) => item.trim())
}

export default splitStringByChar
