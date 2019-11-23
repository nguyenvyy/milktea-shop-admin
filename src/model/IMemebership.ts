export interface IMembership {
    id: string
    name: string
    email: string
    phoneNumber: string
    address: string
    birthday: Date
    orders: string[]
    point: number // default 0
    numberOfCancels: number // default 0
    numberOfReturns: number // default 0
    createAt?: Date
    updateAt?: Date
    isDeleted: boolean // default false
}

export interface ICartDetail {
    id: string
    price: number
    count: number
}