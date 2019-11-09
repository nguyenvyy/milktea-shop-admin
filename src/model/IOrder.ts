export interface IOrderFromCusTomer {
    id: string,
    priceTotal: number,
    idMembership?: string,
    idDisscount?: string,
    surcharges: ISurcharge[],
    idPaymentMethod: string,
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