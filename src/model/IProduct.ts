export interface IProduct {
    id: string
    name: string
    price: number
    description: string,
    categoryId: string
    updateAt: Date
    createAt: Date
    isDeleted: boolean
    imgURL: string
}