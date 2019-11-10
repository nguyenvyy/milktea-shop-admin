import { DiscountActionTypes, REQUEST_DISCOUNT, RECEIVE_DISCOUNTS, STOP_REQUEST_DISCOUNT, ADD_DISCOUNT, EDIT_DISCOUNT, DELETE_DISCOUNT, DiscountState } from "../actions/discount/types"
import { getDiscountIndexById } from "../selectors/discount"

const initState: DiscountState = {
    items: [],
    isFetching: false,
}

export const discountReducer = (
    state = initState,
    action: DiscountActionTypes): DiscountState => {
    switch (action.type) {
        case REQUEST_DISCOUNT:
            return {
                ...state,
                isFetching: true
            }
        case STOP_REQUEST_DISCOUNT:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_DISCOUNTS:
            return {
                items: action.payload,
                isFetching: state.isFetching
            }
        case ADD_DISCOUNT:
            return {
                items: [action.payload, ...state.items],
                isFetching: state.isFetching
            }
        case EDIT_DISCOUNT:
            const index = getDiscountIndexById(state.items, action.payload.id)
            let newItems = [...state.items]
            newItems.splice(index, 1, action.payload)
            return {
                ...state,
                items: newItems
            }
        case DELETE_DISCOUNT: {
            const index = getDiscountIndexById(state.items, action.payload)
            let newItems = [...state.items]
            let deletedItem = {
                ...state.items[index],
                isDeleted: true
            }
            newItems.splice(index, 1, deletedItem)
            return {
                ...state,
                items: newItems
            }
        }
        default:
            return state
    }
}