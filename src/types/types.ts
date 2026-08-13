export default interface dispatchObject {
    id: string,
    name: string,
    mobile: string,
    password: string,
}

export interface contactListsInitial {
    contactLists: dispatchObject[]
}