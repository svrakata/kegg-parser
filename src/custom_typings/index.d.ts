declare namespace jest {
    interface Matchers<R, T> {
        toContainObject: (arr: any) => any
    }

    interface Expect {
        toContainObject: (arr: any) => any
    }
}

interface IKEGGEnvironListItemName {
    text: string
    code?: string
}

interface IKEGGEnvironListItem {
    id: string
    name: IKEGGEnvironListItemName[]
}

interface IKEGGObject {
    entry: IKEGGEntry
    name: IKEGGName[]
    catergory: IKEGGCategory
    component: IKEGGComponent[]
    source: IKEGGSource[]
    remark: IKEGGRemark
    brite: IKEGGBriteCategory[]
}

interface IKEGGEntry {
    code: string
    text: string
}

interface IKEGGName {
    code: string
    text: string
}

type IKEGGCategory = string

interface IKEGGComponent {
    name: string,
    code: string[]
    major: boolean
}

interface IKEGGSource {
    text: string
    code: string[]
}

interface IKEGGRemark {
    label: string
    code: string[]
}

interface IKEGGComment {
    text: string
}

interface IKEGGBriteCategory {
    name: string
    code: string
    content: IKEGGBriteSubcategory[]
}

interface IKEGGBriteSubcategory {
    name: string
    code?: string
    content: IKEGGBriteSubcategory | IKEGGBriteSubCategoryContentItem[]
}

interface IKEGGBriteSubCategoryContentItem {
    name: IKEGGName[]
    code: string
}