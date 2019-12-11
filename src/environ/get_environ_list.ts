import baseURL from "../base_URL"
import get from "../request/get"
import environListParser, { IEnvironListItem } from "./environ_list_parser"

export type IGetEnvironListOutputType = "csv" | "json"

interface IGetEnvironListOptions {
    outputType: IGetEnvironListOutputType
}

type TGetEnvironList = (options?: IGetEnvironListOptions) => Promise<IEnvironListItem[] | JSON | string>

const DBNAME = "ENVIRON"

const getEnvironList: TGetEnvironList = async (options = null) => {
    let outputType = null

    if (options !== null) {
        outputType = options.outputType
    }

    const environList = await get({ url: `${baseURL}/${DBNAME}` })


    return environListParser(environList, outputType)
}

export default getEnvironList
