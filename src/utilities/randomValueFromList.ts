export type IGetRandomItemFromList<T> = (list: T[]) => T

const getRandomValueFromList = <T>(list: T[]) => {
    const range = list.length
    const randomIndex = Math.floor(Math.random() * range)
    return list[ randomIndex ]
}

export default getRandomValueFromList
