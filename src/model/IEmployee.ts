export interface IEmployee {
    id: string
    idRole: string
    name: string
    email: string
    point: number
    orderCount: number
    phoneNumber: string
    address: string
    birthday: Date
    createAt?: Date
    updateAt?: Date
    isDeleted: boolean
}
