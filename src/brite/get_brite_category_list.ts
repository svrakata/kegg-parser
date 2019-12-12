import baseURL from "./../base_URL"
import get from "./../request/get"

type TGetBriteCategoryList = (categoryID: string) => Promise<string>

const getBriteCategoryList: TGetBriteCategoryList = async (categoryID) => {
    const briteCategoryList = await get({ url: `${baseURL}/get/${categoryID}` })
    return briteCategoryList
}

export default getBriteCategoryList


