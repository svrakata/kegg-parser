import request, { CoreOptions, UrlOptions } from "request"
import getConsecutiveItemFromList from "../utilities/getConsecutiveItemFromList"
import proxyList from "./proxy_list"
import userAgentList from "./user_agents"

const timeout = 30000
const nextProxy = getConsecutiveItemFromList(proxyList)
const nextUserAgent = getConsecutiveItemFromList(userAgentList)

export const get = (options: CoreOptions & UrlOptions): Promise<string> => {
    options.method = "GET"
    options.headers = { "User-Agent": nextUserAgent() }

    const nextProxyServer = nextProxy().server

    request.defaults({
        proxy: nextProxyServer,
        timeout,
    })

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error)
            }
            if (response.statusCode === 200) {
                resolve(body)
            } else {
                reject(response.statusCode.toString())
            }

        })
    })
}

