const generatorFrom = function*<T>(iterable: T[]): Generator<T> {
    for (const item of iterable) {
        yield item
    }
}

export default generatorFrom
