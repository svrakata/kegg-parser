// custom test functionality copied from here:
// link -> https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98

// custom test functionality copied from here:
// link -> https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98

import { parseDrugName, parseLineContent, parseList, splitLine } from "../src/keggListParser"
import keggListTestCases from "./kegg_list_test_cases.json"

describe("Testing kegg database list parser.", () => {
    it("Parsing keg list should split each line to label and content", () => {
        const { input, output } = keggListTestCases[ 0 ]
        expect(splitLine(input)).toEqual(output)
    })

    it("Parsing keg list should split each drug name from the content to node with text and code properties", () => {
        const { input, output } = keggListTestCases[ 1 ]
        expect(parseDrugName(input)).toEqual(output)
    })

    it("Parsing keg list should split content to nodes containing text and codes", () => {
        const { input, output } = keggListTestCases[ 2 ]
        expect(parseLineContent(input)).toEqual(output)
    })

    it("Parsing keg list should return array of properly formatted objects", () => {
        const { input, output } = keggListTestCases[ 3 ]
        expect(parseList(input)).toEqual(output)
    })

})
