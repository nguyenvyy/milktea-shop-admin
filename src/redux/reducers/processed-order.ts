import { Reducer } from "redux";
import { ProcessedOrderState, ProcessedOrderActionTypes, RECEIVE_PROCESSED_ORDERS, UPDATE_PROCESSED_ORDERS } from "../actions/processed-order/types";

const initState: ProcessedOrderState = {
    items: []
}
export const processedOrderReducer: Reducer<ProcessedOrderState, ProcessedOrderActionTypes> = (
    state = initState,
    action,
) => {
    switch (action.type) {
        case RECEIVE_PROCESSED_ORDERS:
            return {
                ...state,
                items: [...action.payload, ...state.items]
            }
        case UPDATE_PROCESSED_ORDERS: {
            let ordersCopy = [...state.items]
            action.payload.forEach(item => {
                ordersCopy.splice(item.index, 1, item.order)
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

