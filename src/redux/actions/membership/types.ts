import { IMembership } from "../../../model/IMemebership"

export const RECEIVE_MEMBERSHIPS = 'RECEIVE_MEMBERSHIPS'
export const DELETE_MEMBERSHIP = 'DELETE_MEMBERSHIP'
export const UPDATE_MEMBERSHIPS = 'UPDATE_MEMBERSHIPS'

export const REQUEST_MEMBERSHIP = 'REQUEST_MEMBERSHIP'
export const STOP_REQUEST_MEMBERSHIP = 'STOP_REQUEST_MEMBERSHIP'

export interface ReceiveMembershipAction {
    type: typeof RECEIVE_MEMBERSHIPS
    payload: IMembership[]
}

export interface UpdateMembershipsAction {
    type: typeof UPDATE_MEMBERSHIPS
    payload: UpdatedMembership[]
}

export interface DeleteMembershipAction {
    type: typeof DELETE_MEMBERSHIP
    payload: IMembership
}


export interface RequestMembershipAction {
    type: typeof REQUEST_MEMBERSHIP
}

export interface StopRequestMembershipAction {
    type: typeof STOP_REQUEST_MEMBERSHIP
}

export type MembershipActionTypes = (
    ReceiveMembershipAction |
    DeleteMembershipAction |
    RequestMembershipAction |
    StopRequestMembershipAction |
    UpdateMembershipsAction
) 

export interface MembershipState {
    items: IMembership[]
    loading: boolean
}

export interface UpdatedMembership {
    membership: IMembership
    index: number
}