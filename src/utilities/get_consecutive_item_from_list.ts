type getConsecutiveItemFromList<T> = (lsit: T[]) => () => T

const getConsecutiveItemFromList = <T>(list: T[]) => {
    let index = 0
    const range = list.length
    return () => {
        if (index === range) {
            index = 0
        }
        return list[ index++ ]
    }
}

export default getConsecutiveItemFromList
