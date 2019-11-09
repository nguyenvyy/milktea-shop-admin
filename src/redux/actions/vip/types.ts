import { IVIP } from "../../../model/IVIP"

export const ADD_VIP = 'ADD_VIP'
export const DELETE_VIP = 'DELETE_VIP'
export const EDIT_VIP = 'EDIT_VIP'

export const RECEIVE_VIPS = 'RECEIVE_VIPS'
export const REQUEST_VIP = 'REQUEST_VIP'
export const STOP_REQUEST_VIP = 'STOP_REQUEST_VIP'

export interface AddVIPAction {
    type: typeof ADD_VIP,
    payload: IVIP
}

export interface DeleteVIPAction {
    type: typeof DELETE_VIP,
    payload: string
}

export interface EditVIPAction {
    type: typeof EDIT_VIP,
    payload: IVIP
}
export interface ReceiveVIPsAction {
    type: typeof RECEIVE_VIPS,
    payload: IVIP[]
}

export interface RequestVIPAction {
    type: typeof REQUEST_VIP
}

export interface StopRequestVIPAction {
    type: typeof STOP_REQUEST_VIP
}

export type VIPActionTypes = (
    AddVIPAction |
    DeleteVIPAction |
    EditVIPAction |
    ReceiveVIPsAction |
    RequestVIPAction |
    StopRequestVIPAction
)

export interface VIPState {
    items: IVIP[],
    isFetching: Boolean
}