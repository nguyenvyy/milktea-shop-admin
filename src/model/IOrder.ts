export interface IOrder {
    id: string
    idPaymentMethod: string
    idState: string
    receiverInfo: {
        name: string,
        address: string,
        numberPhone: string
    }
    detail: IOrderDetail[]
    priceTotal: number
    createAt: Date
    updateAt: Date
    paidAt?: Date
    disscount? : {
        id: string
        code : string
        value: number
    }
    idMembership?: string
    idEmployee?: string
}

export interface IOrderDetail {
    id: string,
    count: number,
    price: number
}
