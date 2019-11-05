import { LOGIN, AUTHENTICATION_SUCCEEDED, STOP_LOGIN, LOGOUT } from "../actions/auth/types"

const initState = {
    user: null,
    isLoggedIn: true,
    isLoadingUser: false,
}

export const authReducer = (state = initState, action: {type: string, user?: object}): any => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoadingUser: true
            }
        case AUTHENTICATION_SUCCEEDED:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
            }
        case STOP_LOGIN:
            return {
                ...state,
                isLoadingUser: false
            }
        case LOGOUT:
            return initState
        default:
            return state
    }
} 