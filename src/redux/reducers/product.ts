import { ProductState, ProductActionTypes, REQUEST_PRODUCT, STOP_REQUEST_PRODUCT, RECEIVE_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from "../actions/product/types";
import { getProductIndexById } from "../selectors/product";


const initSate: ProductState = {
    items: [],
    isFeatching: false
}

export const productReducer = (
    state = initSate,
    action: ProductActionTypes
): ProductState => {
    switch (action.type) {
        case REQUEST_PRODUCT:
            return {
                ...state,
                isFeatching: true
            }
        case STOP_REQUEST_PRODUCT:
            return {
                ...state,
                isFeatching: false
            }
        case RECEIVE_PRODUCTS:
            return {
                items: action.payload,
                isFeatching: state.isFeatching
            }
        case ADD_PRODUCT:
            return {
                items: [action.payload, ...state.items],
                isFeatching: state.isFeatching
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
            let deletedCategory = {
                ...state.items[index],
                isDeleted: true
            }
            newItems.splice(index, 1, deletedCategory)
            return {
                ...state,
                items: newItems
            }
        }
        default:
            return state
    }
}