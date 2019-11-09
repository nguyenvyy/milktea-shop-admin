import { IVIP } from "../../../model/IVIP";
import { AddVIPAction, ADD_VIP, DeleteVIPAction, DELETE_VIP, EditVIPAction, EDIT_VIP, RequestVIPAction, REQUEST_VIP, STOP_REQUEST_VIP, StopRequestVIPAction, ReceiveVIPsAction, RECEIVE_VIPS } from "./types";
import { getVIPsAPI, addVIPAPI, updateVIPAPI, deleteVIPAPI } from "./servives";
import { undefinedError, success } from "../../../constant";

export const addVIP = (vip: IVIP): AddVIPAction => ({
    type: ADD_VIP,
    payload: vip
})

export const deleteVIP = (id: string): DeleteVIPAction => ({
    type: DELETE_VIP,
    payload: id
})

export const editVIP = (vip: IVIP): EditVIPAction => ({
    type: EDIT_VIP,
    payload: vip
})

export const requestVIP = (): RequestVIPAction => ({
    type: REQUEST_VIP
})

export const stopRequestVIP = (): StopRequestVIPAction => ({
    type:STOP_REQUEST_VIP
})

export const receiveVIPs = (vips: IVIP[]): ReceiveVIPsAction => ({
    type: RECEIVE_VIPS,
    payload: vips
})

export const fetchVIPs = () => (dispatch: any) => {
    dispatch(requestVIP)
    return getVIPsAPI()
    .then(vips => {
        dispatch(stopRequestVIP())
        if(vips[1] === undefinedError) {
            return undefinedError
        }
        dispatch(receiveVIPs(vips))
        return success
    })
}

export const requestAddVIP = (vip: IVIP) => (dispatch: any) => {
    dispatch(requestVIP())
    return addVIPAPI(vip)
        .then((newVIP: any | IVIP) => {
            dispatch(stopRequestVIP())
            if(newVIP[1] === undefinedError) {
                return undefinedError
            }
            dispatch(addVIP(newVIP))
            return success
        })
}

export const requestEditVIP = (vip: IVIP) => (dispatch: any) => {
    dispatch(requestVIP())
    return updateVIPAPI(vip)
        .then((newVIP: any | IVIP) => {
            dispatch(stopRequestVIP())
            if(newVIP[1] === undefinedError) {
                return undefinedError
            }
            dispatch(editVIP(vip))
            return success
        })
}

export const requestDeleteVIP = (id: string) => (dispatch: any) => {
    dispatch(requestVIP())
    return deleteVIPAPI(id)
        .then((id: any | string) => {
            dispatch(stopRequestVIP())
            if(id[1] === undefinedError) {
                return undefinedError
            }
            dispatch(deleteVIP(id))
            return success
        })
}
