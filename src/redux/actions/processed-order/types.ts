import { IOrder } from "../../../model/IOrder"

export const RECEIVE_PROCESSED_ORDERS = 'RECEIVE_PROCESSED_ORDERS'
export const UPDATE_PROCESSED_ORDERS = 'UPDATE_PROCESSED_ORDERS'

export interface ReceiveProcessedOrdersAction {
    type: typeof RECEIVE_PROCESSED_ORDERS
    payload: IOrder[]
}

export interface UpdateProcessedOrdersAction {
    type: typeof UPDATE_PROCESSED_ORDERS
    payload: IUpdatedProcessedOrder[]
}

export type ProcessedOrderActionTypes = (
    ReceiveProcessedOrdersAction |
    UpdateProcessedOrdersAction
) 

export interface ProcessedOrderState {
    items: IOrder[]
}

export interface IUpdatedProcessedOrder {
    order: IOrder
    index: number
}