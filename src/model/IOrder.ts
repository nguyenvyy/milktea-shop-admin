export interface IOrder {
    id: string //
    idPaymentMethod: string //
    idState: string //
    receiverInfo: {
        name: string,
        address: string,
        phoneNumber: string
    }
    detail: IOrderDetail[] 
    priceTotal: number //
    disscount? : { //
        id: string
        code : string
        value: number
    }
    createAt: Date //
    updateAt: Date
    paidAt?: Date
    idMembership?: string //
    idEmployee?: string
    require? : string
}

export interface IOrderDetail {
    id: string,
    count: number,
    price: number
}
