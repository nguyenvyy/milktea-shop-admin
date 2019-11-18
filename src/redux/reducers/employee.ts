import { EmployeeActionTypes, REQUEST_EMPLOYEE, RECEIVE_EMPLOYEES, STOP_REQUEST_EMPLOYEE, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE, EmployeeState } from "../actions/employee/types"
import { getEmployeeIndexById } from "../selectors/employee"

const initState: EmployeeState = {
    items: [],
    isFetching: false,
}

export const employeeReducer = (
    state = initState,
    action: EmployeeActionTypes): EmployeeState => {
    switch (action.type) {
        case REQUEST_EMPLOYEE:
            return {
                ...state,
                isFetching: true
            }
        case STOP_REQUEST_EMPLOYEE:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_EMPLOYEES:
            return {
                items: action.payload,
                isFetching: state.isFetching
            }
        case ADD_EMPLOYEE:
            return {
                items: [action.payload, ...state.items],
                isFetching: state.isFetching
            }
        case EDIT_EMPLOYEE:
            const index = getEmployeeIndexById(state.items, action.payload.id)
            if(index === -1) return state
            let newItems = [...state.items]
            newItems.splice(index, 1, action.payload)
            return {
                ...state,
                items: newItems
            }
        case DELETE_EMPLOYEE: {
            const index = getEmployeeIndexById(state.items, action.payload)
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