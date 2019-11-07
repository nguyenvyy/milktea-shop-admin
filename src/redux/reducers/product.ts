import { ProductState, ProductActionTypes, REQUEST_PRODUCT, STOP_REQUEST_PRODUCT, RECEIVE_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from "../actions/product/types";
import { getProductIndexById } from "../selectors/product";


const initSate: ProductState = {
    items: [],
    isFetching: false
}

export const productReducer = (
    state = initSate,
    action: ProductActionTypes
): ProductState => {
    switch (action.type) {
        case REQUEST_PRODUCT:
            return {
                ...state,
                isFetching: true
            }
        case STOP_REQUEST_PRODUCT:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_PRODUCTS:
            return {
                items: action.payload,
                isFetching: state.isFetching
            }
        case ADD_PRODUCT:
            return {
                items: [action.payload, ...state.items],
                isFetching: state.isFetching
            }
        case EDIT_PRODUCT:
            const index = getProductIndexById(state.items, action.payload.id)
            let newItems = state.items.slice()
            newItems.splice(index, 1, action.payload)
            return {
                ...state,
                items: newItems
            }
        case DELETE_PRODUCT: {
            const index = getProductIndexById(state.items, action.payload)
            let newItems = [...state.items]
            let deletedProduct = {
                ...state.items[index],
                isDeleted: true
            }
            newItems.splice(index, 1, deletedProduct)
            return {
                ...state,
                items: newItems
            }
        }
        default:
            return state
    }
}