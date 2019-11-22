export const parseList = (text: string): IKEGGEnvironListItem[] => {
    console.log(text)
    // const lines = text.trim().split("\n")
    // const parsedLines = lines.map((line) => {
    //     const splitLine = line.split("\t")
    //     const id = splitLine[ 0 ]
    //     const splitNames = splitLine[ 1 ].split(";")
    //     const names = splitNames.map((name) => {
    //         return name.trim().replace(/ \((.*)\)/g, "")
    //     })

    //     return {
    //         id,
    //         names,
    //     }
    // })

    return [ {
        id: "1234",
        name: [
            {
                code: "2123",
                text: "123,",
            },
        ],
    } ]
}

export const parseDrug = (text: string): any => {
    return { name: text }
}
