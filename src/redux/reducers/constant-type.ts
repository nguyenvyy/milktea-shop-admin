import { ConstantTypeState, ConstantTypeActionTypes, REQUEST_CONSTANT_TYPES, STOP_REQUEST_CONSTANT_TYPES, RECEIVE_CONSTANT_TYPES } from "../actions/constant-type/types";

const initState: ConstantTypeState = {
    isFetching: false,
    roles: [],
    paymentMethods: [],
    orderStates: []
}

export const constantTypeReducer = (state = initState, action: ConstantTypeActionTypes) => {
    switch (action.type) {
        case REQUEST_CONSTANT_TYPES:
            return {
                ...state,
                isFetching: true
            };
        case STOP_REQUEST_CONSTANT_TYPES:
            return {
                ...state,
                isFetching: false
            };
        case RECEIVE_CONSTANT_TYPES:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}