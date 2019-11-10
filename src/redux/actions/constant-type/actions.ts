import { IRole, IOrderState, IPaymentMethod } from "../../../model/constant-types-interface";
import { undefinedError, success } from "../../../constant";
import { RECEIVE_CONSTANT_TYPES, REQUEST_CONSTANT_TYPES, STOP_REQUEST_CONSTANT_TYPES, StopRequestContantTypeAction, RequesContantTypeAction, ReceiveContantTypesAction } from "./types";
import { getOrderStatesAPI, getRolesAPI, getPaymentMethodsAPI } from "./servives";



const requestConstantType = (): RequesContantTypeAction => ({
    type: REQUEST_CONSTANT_TYPES
})

const stopRequestConstantType = (): StopRequestContantTypeAction => ({
    type: STOP_REQUEST_CONSTANT_TYPES
})

const receiveConstantTypes = (roles: IRole[], orderStates: IOrderState[], paymentMethods: IPaymentMethod[]): ReceiveContantTypesAction => ({
    type: RECEIVE_CONSTANT_TYPES,
    payload: {
        roles,
        orderStates,
        paymentMethods,
    }
})

export const fetchConstantTypes = () => async (dispatch: any) => {
    dispatch(requestConstantType())
    return Promise.all([getRolesAPI(), getOrderStatesAPI(), getPaymentMethodsAPI()])
        .then((arr: any) => {
            dispatch(stopRequestConstantType())
            if (arr[0][1] === undefinedError) return undefinedError
            dispatch(receiveConstantTypes(arr[0], arr[1], arr[2]))
            return success
        });
}