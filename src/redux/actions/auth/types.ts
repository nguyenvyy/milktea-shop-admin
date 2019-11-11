import { IEmployee } from "../../../model/IEmployee"
import './services'

export const REQUEST_AUTH = 'REQUEST_AUTH'
export const STOP_REQUEST_AUTH = 'STOP_REQUEST_AUTH'
export const RECEIVE_INFO = 'RECEIVE_INFO'
export const CLEAR_USER = 'CLEAR_USER'

export interface ReceiveInfoAction {
    type: typeof RECEIVE_INFO,
    payload: IEmployee
}

export interface RequestAuthAction {
    type: typeof REQUEST_AUTH
}

export interface StopRequestAuthAction {
    type: typeof STOP_REQUEST_AUTH
}

export interface ClearUserAction {
    type: typeof CLEAR_USER
}

export type AuthActionTypes = (
    ReceiveInfoAction |
    RequestAuthAction |
    StopRequestAuthAction |
    ClearUserAction
)

export interface AuthState {
    user: IEmployee | null
    isLoggedIn: boolean
    isLoading: boolean
} 
