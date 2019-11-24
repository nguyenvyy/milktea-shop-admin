import { Reducer } from "redux";
import { ProcessingOrderState, ProcessingOrderActionTypes, RECEIVE_PROCESSING_ORDERS, UPDATE_PROCESSING_ORDERS, DELETE_PROCESSING_ORDERS } from "../actions/processing-order/types";

const initState: ProcessingOrderState = {
    items: [],
    loading: false
}
export const processingOrderReducer: Reducer<ProcessingOrderState, ProcessingOrderActionTypes> = (
    state = initState,
    action,
) => {
    switch (action.type) {
        case RECEIVE_PROCESSING_ORDERS:
            return {
                ...state,
                items: [...action.payload, ...state.items]
            }
        case UPDATE_PROCESSING_ORDERS: {
            let ordersCopy = [...state.items]
            action.payload.forEach(item => {
                ordersCopy.splice(item.index, 1, item.order)
            })
            return {
                ...state,
                items: [...ordersCopy]
            }
        }
        case DELETE_PROCESSING_ORDERS: {
            let ordersCopy = [...state.items]
            action.payload.forEach(item => {
                ordersCopy.splice(item, 1)
            })
            return {
                ...state,
                items: [...ordersCopy]
            }
        }
        default:
            return state
    }

}

