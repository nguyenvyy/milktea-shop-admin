import { REQUEST_AUTH, RECEIVE_INFO, STOP_REQUEST_AUTH, CLEAR_USER, AuthState, AuthActionTypes } from "../actions/auth/types"

const initState: AuthState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
}

export const authReducer = (state = initState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case REQUEST_AUTH:
            return {
                ...state,
                isLoading: true
            }
        case RECEIVE_INFO:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            }
        case STOP_REQUEST_AUTH:
            return {
                ...state,
                isLoading: false
            }
        case CLEAR_USER:
            return initState
        default:
            return state
    }
} 