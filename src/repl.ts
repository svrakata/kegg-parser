import { getDocument } from "./request"


const briteParser = (briteContent: string) => {
    console.log(briteContent)
}


const load = async () => {

    const parsedKeggObject = {}
    const parsedLines = []
    let lastContent = []
    let currentParsedLine: any = {}
    const rawObject = await getDocument("http://rest.kegg.jp/get/ev:E00001")
    const lines = rawObject.trim().split("\n")

    for (const line of lines) {
        const label = line.substring(0, 12).trim()
        const content = line.substring(12)


        if (label !== "") {
            lastContent = []
            currentParsedLine.label = label
            currentParsedLine.content = lastContent
            parsedLines.push(currentParsedLine)
            currentParsedLine = {}
        }

        lastContent.push(content)
    }

    for (const line of parsedLines) {
        const { label, content } = line
        switch (label) {
            case "BRITE":
                briteParser(content)
        }
    }

}


// 'Therapeutic category of drugs in Japan [BR:br08301]', ---> identation, code, text, check next
//  ' 5  Crude drugs and Chinese medicine formulations', ---> identation, code, text, check next
//  '  51  Crude drugs', ---> identation, code, text, check next
//  '   510  Crude drugs',---> identation, code, text, check next
//  '    5100  Crude drugs',---> identation, code, text, check next
//  '     D00092  Coptis rhizome (JP17); Powdered coptis rhizome (JP17)', ---> identation, code, text, check next,


load()


