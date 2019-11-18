export interface IMembership {
    id: string
    name: string
    email: string
    point: number
    phoneNumber: string
    address: string
    birthday: Date
    orderList: string[]
    createAt?: Date
    updateAt?: Date
    isDeleted: boolean
}
