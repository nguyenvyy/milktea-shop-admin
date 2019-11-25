import { IOrder } from "../../../model/IOrder"

export const RECEIVE_PROCESSING_ORDERS = 'RECEIVE_PROCESSING_ORDERS'
export const UPDATE_PROCESSING_ORDERS = 'UPDATE_PROCESSING_ORDERS'
export const DELETE_PROCESSING_ORDERS = 'DELETE_PROCESSING_ORDERS'

export interface ReceiveProcessingOrdersAction {
    type: typeof RECEIVE_PROCESSING_ORDERS
    payload: IOrder[]
}

export interface UpdateProcessingOrdersAction {
    type: typeof UPDATE_PROCESSING_ORDERS
    payload: IUpdatedProcessingOrder[]
}

export interface DeleteProcessingOrdersAction {
    type: typeof DELETE_PROCESSING_ORDERS
    payload: number[] // ids order
}


export type ProcessingOrderActionTypes = (
    ReceiveProcessingOrdersAction |
    DeleteProcessingOrdersAction |
    UpdateProcessingOrdersAction
) 

export interface ProcessingOrderState {
    items: IOrder[]
    loading: boolean
}

export interface IUpdatedProcessingOrder {
    order: IOrder
    index: number
}