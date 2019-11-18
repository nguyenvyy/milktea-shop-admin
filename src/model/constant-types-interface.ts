export interface IRole {
    id: string,
    name: string,
    value: number,
}

export interface IOrderState {
    id: string,
    name: string,
    color: string,
    canFeedback: boolean,
    canCancel: boolean,
    canReturn: boolean
}

export interface IPaymentMethod {
    id: string,
    name: string
}