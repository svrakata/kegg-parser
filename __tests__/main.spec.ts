import { parseList } from "../src/parser"
// custom test functionality copied from here:
// link -> https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
// tslint:disable-next-line: no-namespace

expect.extend({
    toContainObject(received, argument) {
        const pass = this.equals(received, expect.arrayContaining([ expect.objectContaining(argument) ]))
        if (pass) {
            return {
                // tslint:disable-next-line: max-line-length
                message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
                pass: true,
            }
        } else {
            return {
                // tslint:disable-next-line: max-line-length
                message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
                pass: false,
            }
        }
    },
})

describe("Test if the parseList returns json with proper data", () => {
    it("Expect parsed list to return array with objects", () => {
        const dummyText = `
        ev:E00001	Coptis rhizome (JP17)
        `
        const list = parseList(dummyText)

        expect(list).toContainObject(
            {
                id: "ev:E00001",
                names: [ "Coptis rhizome" ],
            })
    })
})

