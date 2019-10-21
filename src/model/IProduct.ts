export interface IProduct {
    id: string
    name: string
    price: number
    productTypeId: string
    lastUpdate: Date
    isDeleted: boolean
    isSelling: boolean
    imgURL: string
}