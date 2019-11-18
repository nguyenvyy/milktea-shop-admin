import { RequestAuthAction, REQUEST_AUTH, StopRequestAuthAction, STOP_REQUEST_AUTH, ReceiveInfoAction, RECEIVE_INFO, ClearUserAction, CLEAR_USER } from "./types";
import { IEmployee } from "../../../model/IEmployee";
import { authAPI, signOutAPI } from "./services";

const requestAuth = (): RequestAuthAction => ({type: REQUEST_AUTH});
const stopRequestAuth = (): StopRequestAuthAction => ({type: STOP_REQUEST_AUTH})
export const receiveInfo = (employee: IEmployee): ReceiveInfoAction => ({type: RECEIVE_INFO, payload: employee})
const clearUser = (): ClearUserAction => ({type: CLEAR_USER})

export const authenticateUser = (email: string, password: string) => (dispatch: any) => {
    dispatch(requestAuth())
    return authAPI(email, password)
        .then(res => {
            dispatch(stopRequestAuth())
            if(res.status === 200) {
                dispatch(receiveInfo(res.employee))
            }
            return res
        })
}

export const signOut = () => (dispatch: any) => {
    dispatch(requestAuth())
    return signOutAPI()
    .then(res => {
        dispatch(stopRequestAuth())
        if(res.status === 200) {
            dispatch(clearUser())
        }
        return res
    })
}