declare namespace jest {
    interface Matchers<R, T> {
        toContainObject: (arr: any) => any
    }

    interface Expect {
        toContainObject: (arr: any) => any
    }
}

interface IKEGGName {
    code?: string
    text: string
}

interface IKEGGEnvironListItem {
    id: string
    name: IKEGGName[]
}

interface IKEGGObject {
    entry: IKEGGEntry
    name: IKEGGName[]
    category: IKEGGCategory
    component: IKEGGComponent[]
    source: IKEGGName[]
    remark: IKEGGRemark
    brite: IKEGGBriteCategory[]
}

interface IKEGGEntry {
    code: string
    text: string
}

interface IKEGGCategory {
    text: string
}

interface IKEGGComponent extends IKEGGName {
    major: boolean
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
    code?: string
    content: IKEGGBriteCategory | IKEGGBriteContentItem[]
}

interface IKEGGBriteContentItem {
    name: IKEGGName[]
    code?: string
}