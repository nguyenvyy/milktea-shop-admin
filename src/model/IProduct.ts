export interface IProduct {
    id: string
    name: string
    price: number
    categoryId: string
    updateAt: Date
    createAt: Date
    isDeleted: boolean
    imgURL: string
}