import * as http from "http"
// import * as url from "url"

type TMethod = "GET" | "POST"

export const request = (requestUrl: string, method: TMethod): Promise<string> => {
    // fix it
    // const { host, path } = url.parse(requestUrl)
    return new Promise((resolve, reject) => {
        const req = http.get(requestUrl, (res) => {
            let document = ""
            res.on("data", (chunk) => {
                document += chunk.toString()
            })

            res.on("end", () => {
                resolve(document)
            })
        })

        req.on("error", (err) => {
            reject(err)
        })
    })
}

export const getDocument = (requestUrl: string): Promise<string> => {
    return request(requestUrl, "GET")
}
