import baseURL from "../base_URL"
import get from "../request/get"

// no point of this
// still the brite parsing variates and must be customized

interface IBriteEntry {
    code?: string
    name: string
    property?: string
}

interface IBriteCategory {
    name: string
}


class BriteParser {

    public async getBriteList(briteID: string) {
        const briteCategoryList = await get({ url: `${baseURL}/get/${briteID}` })
        return briteCategoryList
    }

    public async parse(briteID: string) {
        const briteList = await this.getBriteList(briteID)

        const lines = briteList.split("\n")


    }



}

export default BriteParser
