import { ProductCategoryActionTypes, REQUEST_PRODUCT_CATEGORY, RECEIVE_PRODUCT_CATEGORIES, STOP_REQUEST_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY, EDIT_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, ProductCategoryState } from "../actions/product-category/types"
import { getProductCategoryIndexById } from "../selectors/product-category"

const initState: ProductCategoryState = {
    items: [],
    isFeatching: false,
}

export const productCategoryReducer = (
    state = initState,
    action: ProductCategoryActionTypes): ProductCategoryState => {
    switch (action.type) {
        case REQUEST_PRODUCT_CATEGORY:
            return {
                ...state,
                isFeatching: true
            }
        case STOP_REQUEST_PRODUCT_CATEGORY:
            return {
                ...state,
                isFeatching: false
            }
        case RECEIVE_PRODUCT_CATEGORIES:
            return {
                items: action.payload,
                isFeatching: state.isFeatching
            }
        case ADD_PRODUCT_CATEGORY:
            return {
                items: [action.payload, ...state.items],
                isFeatching: state.isFeatching
            }
        case EDIT_PRODUCT_CATEGORY:
            const index = getProductCategoryIndexById(state.items, action.payload.id)
            let newItems = state.items.slice()
            // debugger
            newItems.splice(index, 1, action.payload)
            return {
                ...state,
                items: newItems
            }
        case DELETE_PRODUCT_CATEGORY: {
            const index = getProductCategoryIndexById(state.items, action.payload)
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