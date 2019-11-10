export interface IOrderFromCusTomer {
    id: string,
    priceTotal: number,
    idMembership?: string,
    idDiscount?: string,
    idPaymentMethod: string,
    createAt: Date,
    detail: IOrderDetail[]
}

export interface IOrderDetail {
    idFood: string,
    count: number,
    foodPrice: number
}