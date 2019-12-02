const dblinksParser = (content) => {
    return content.map((item) => {
        const splited = item.split(":")
        const dbName = splited[ 0 ]
        const id = splited[ 1 ].trim()

        return {
            dbName,
            id,
        }
    })
}

export default dblinksParser
