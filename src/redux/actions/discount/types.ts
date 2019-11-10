import { IDiscount } from "../../../model/IDiscount"

export const ADD_DISCOUNT = 'ADD_DISCOUNT'
export const DELETE_DISCOUNT = 'DELETE_DISCOUNT'
export const EDIT_DISCOUNT = 'EDIT_DISCOUNT'

export const RECEIVE_DISCOUNTS = 'RECEIVE_DISCOUNTS'
export const REQUEST_DISCOUNT = 'REQUEST_DISCOUNT'
export const STOP_REQUEST_DISCOUNT = 'STOP_REQUEST_DISCOUNT'

export interface AddDiscountAction {
    type: typeof ADD_DISCOUNT,
    payload: IDiscount
}

export interface DeleteDiscountAction {
    type: typeof DELETE_DISCOUNT,
    payload: string
}

export interface EditDiscountAction {
    type: typeof EDIT_DISCOUNT,
    payload: IDiscount
}
export interface ReceiveDiscountsAction {
    type: typeof RECEIVE_DISCOUNTS,
    payload: IDiscount[]
}

export interface RequestDiscountAction {
    type: typeof REQUEST_DISCOUNT
}

export interface StopRequestDiscountAction {
    type: typeof STOP_REQUEST_DISCOUNT
}

export type DiscountActionTypes = (
    AddDiscountAction |
    DeleteDiscountAction |
    EditDiscountAction |
    ReceiveDiscountsAction |
    RequestDiscountAction |
    StopRequestDiscountAction
)

export interface DiscountState {
    items: IDiscount[],
    isFetching: Boolean
}