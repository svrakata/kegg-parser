import { parseList } from "./keggListParser"
import { getDocument } from "./request"

const load = async () => {
    const list = await getDocument("http://rest.kegg.jp/list/ENVIRON")
    console.log(JSON.stringify(parseList(list)))
}

load()
