import * as http from "http"
// import * as url from "url"

type TMethod = "GET" | "POST"

interface IResponseObject {
    status: number
    document: string
}

export const request = (requestUrl: string): Promise<IResponseObject> => {
    // fix it
    // const { host, path } = url.parse(requestUrl)
    return new Promise((resolve, reject) => {
        const req = http.get(requestUrl, (res) => {
            let document = ""

            res.on("data", (chunk) => {
                document += chunk.toString()
            })

            res.on("end", () => {
                resolve({
                    document,
                    status: res.statusCode,
                })
            })
        })

        req.on("error", (err) => {
            reject(err)
        })
    })
}

export const getDocument = (requestUrl: string): Promise<IResponseObject> => {
    return request(requestUrl)
}
