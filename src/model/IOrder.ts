export interface IOrderFromCusTomer {
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
    paidAt: Date
    idMembership?: string
    disscount? : {
        code : string
        value: number
    }
    idEmployee?: string
    updateAt?: Date
}

export interface IOrderDetail {
    id: string,
    count: number,
    foodPrice: number
}
