import { MembershipState, MembershipActionTypes, RECEIVE_MEMBERSHIPS, UPDATE_MEMBERSHIPS, UpdatedMembership } from "../actions/membership/types";
import { Reducer } from "redux";
import { IMembership } from "../../model/IMemebership";

const initState: MembershipState = {
    items: [],
    loading: false
}
export const membershipReducer: Reducer<MembershipState, MembershipActionTypes> = (
    state = initState,
    action,
) => {
    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            return {
                ...state,
                items: [...action.payload, ...state.items]
            }
        case UPDATE_MEMBERSHIPS:
            let membershipCopy: IMembership[] = [...state.items]
            action.payload.forEach((item: UpdatedMembership) => {
                membershipCopy.splice(item.index, 1, item.membership)
            })
            return {
                ...state,
                items: [...membershipCopy]
            }
        default:
            return state
    }
    
}

