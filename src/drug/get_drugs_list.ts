import fs, { write } from "fs"
import path from "path"
import getDBList from "../get_db_list"

interface IOptions {
    outputType: "json" | "csv",
    outputFolder: string
}

const getDrugsList = async (options: IOptions) => {
    const dbName = "drug"
    const { outputFolder, outputType } = options
    const list = await getDBList({ dbName, outputType })
    fs.writeFileSync(path.resolve(__dirname, outputFolder, `drugs.${outputType}`), list)
}

export default getDrugsList
