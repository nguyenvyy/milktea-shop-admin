import { REQUEST_AUTH, RECEIVE_INFO, STOP_REQUEST_AUTH, CLEAR_USER, AuthState, AuthActionTypes } from "../actions/auth/types"

// const initState: AuthState = {
//     user: {
//         address: 'dqwdqw',
//         birthday: new Date('1998-11-07T17:00:00.000Z'),
//         createAt: new Date('2010-10-21T15:33:21.000Z'),
//         email: 'nguyenphucnguyenvy@gmail.com',
//         id: 'EYi1tcdwjuVx8fFdG7m7y8S5WqA2',
//         idRole: '72y6x8BpGphfRnKVWWEl',
//         isDeleted: false,
//         name: 'NGUYEN VY',
//         orderCount: 32,
//         phoneNumber: '010101',
//         point: 0,
//         updateAt: new Date('2019-11-27T04:34:47.519Z')
//     },
//     isLoggedIn: true,
//     isLoading: false,
// }

const initState: AuthState = {
    user:null,
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