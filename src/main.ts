import { parseList } from "./parser"
import { getDocument } from "./request"

const load = async () => {
    const list = await getDocument("http://rest.kegg.jp/list/ENVIRON")
    const parsedList = parseList(list)
    console.log(parsedList)
    // const drugsData = parsedList.map(())
}

load()
