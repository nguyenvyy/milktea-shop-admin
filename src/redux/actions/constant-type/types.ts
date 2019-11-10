import { IRole, IOrderState, IPaymentMethod } from "../../../model/constant-types-interface"

export const RECEIVE_CONSTANT_TYPES = 'RECEIVE_CONSTANT_TYPES'
export const REQUEST_CONSTANT_TYPES = 'REQUEST_CONSTANT_TYPES'
export const STOP_REQUEST_CONSTANT_TYPES = 'STOP_REQUEST_CONSTANT_TYPES'

export interface ReceiveContantTypesAction {
    type: typeof RECEIVE_CONSTANT_TYPES,
    payload: {
        roles: IRole[],
        orderStates: IOrderState[],
        paymentMethods: IPaymentMethod[]
    }
}

export interface RequesContantTypeAction {
    type: typeof REQUEST_CONSTANT_TYPES
}

export interface StopRequestContantTypeAction {
    type: typeof STOP_REQUEST_CONSTANT_TYPES
}

export type ConstantTypeActionTypes = (
    ReceiveContantTypesAction |
    RequesContantTypeAction |
    StopRequestContantTypeAction
)

export interface ConstantTypeState {
    roles: IRole[],
    orderStates: IOrderState[],
    paymentMethods: IPaymentMethod[],
    isFetching: Boolean
}