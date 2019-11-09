export interface IOrderFromCusTomer {
    id: Date,
    priceTotal: number,
    idMembership?: string,
    idDisscount?: string,
    surcharge: ISurcharge[],
    idPaymentMethod: string,
    idState: string,
    createAt: Date,
    detail: IOrderDetail[]
}

export interface ISurcharge {
    id: string,
    value: number
}

export interface IOrderDetail {
    idFood: string,
    count: number,
    foodPrice: number
}