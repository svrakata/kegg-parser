// cannot restart generator, once it is exausted you have to call the function again

const generatorFrom = function*<T>(iterable: T[]): Generator<T> {
    for (const item of iterable) {
        yield item
    }
}

export default generatorFrom
