import { Parser } from "json2csv"

type TConvertJSONToCSV = (json: any, fields?: string[]) => string

const convertJSONToCSV: TConvertJSONToCSV = (json: any, fields = null) => {
    const options = { fields, quote: "" }
    let csv

    try {
        const parser = new Parser(options)
        csv = parser.parse(json)
    } catch (err) {
        console.error(err)
    }


    return csv
}

export default convertJSONToCSV
