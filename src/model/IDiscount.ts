export interface IDiscount {
    id: string,
    name: string,
    value: number,
    code: string,
    description: string,
    minPoint: number,
    createAt?: Date,
    updateAt?: Date
    isDeleted: boolean
}