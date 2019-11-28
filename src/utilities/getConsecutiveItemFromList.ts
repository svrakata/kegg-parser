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


// cannot restart generator, once it is exausted you have to call the function again
// const getConsecutiveItemFromList = function* <T>(list: T[]): Generator<T, void, T> {
//     for (const item of list) {
//         yield item
//     }
// }

export default getConsecutiveItemFromList
