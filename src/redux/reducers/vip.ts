import { VIPActionTypes, REQUEST_VIP, RECEIVE_VIPS, STOP_REQUEST_VIP, ADD_VIP, EDIT_VIP, DELETE_VIP, VIPState } from "../actions/vip/types"
import { getVIPIndexById } from "../selectors/vip"
const initState: VIPState = {
    items: [],
    isFetching: false,
}

export const vipReducer = (
    state = initState,
    action: VIPActionTypes): VIPState => {
    switch (action.type) {
        case REQUEST_VIP:
            return {
                ...state,
                isFetching: true
            }
        case STOP_REQUEST_VIP:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_VIPS:
            return {
                items: action.payload,
                isFetching: state.isFetching
            }
        case ADD_VIP:
            return {
                items: [action.payload, ...state.items],
                isFetching: state.isFetching
            }
        case EDIT_VIP:
            const index = getVIPIndexById(state.items, action.payload.id)
            let newItems = [...state.items]
            newItems.splice(index, 1, action.payload)
            return {
                ...state,
                items: newItems
            }
        case DELETE_VIP: {
            const index = getVIPIndexById(state.items, action.payload)
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