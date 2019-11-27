export interface IDiscount {
    id: string,
    name: string,
    value: number,
    duration: number,
    givedCount: number,
    createAt?: Date,
    updateAt?: Date
    isDeleted: boolean
}


export type Reward = {
    id?: string,
    idDiscount: string,
    value: number,
    createAt: Date,
    expiryDate: Date,
    used: boolean,
    name: string
}