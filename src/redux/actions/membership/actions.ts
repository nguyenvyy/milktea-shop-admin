import { IMembership } from "../../../model/IMemebership"
import { ReceiveMembershipAction, RECEIVE_MEMBERSHIPS, UpdatedMembership, UpdateMembershipsAction, UPDATE_MEMBERSHIPS } from "./types"
import { Dispatch } from "redux"
import { FirebaseServices } from "../../../services/firebase"
import { collections } from "../../../constant/FirebaseEnum"

export const receiveMemberships = (memberships: IMembership[]): ReceiveMembershipAction => ({
    type: RECEIVE_MEMBERSHIPS,
    payload: memberships
})

export const updateMemberships = (updatedMemberships: UpdatedMembership[]): UpdateMembershipsAction => ({
    type: UPDATE_MEMBERSHIPS,
    payload: updatedMemberships
})


export const realtimeUpdateMemberships = () => (dispatch: Dispatch) => {
    const membersipListener = FirebaseServices.db.collection(collections.memberships).orderBy("createAt", 'desc').onSnapshot(querySnap => {
        let newMemberships: Array<IMembership> = []
        let updatedMemberships: Array<UpdatedMembership> = []
        querySnap.docChanges().forEach(function(change) {
            const data: any = change.doc.data()
            const membership: IMembership = {
                ...data,
                birthday: data.birthday.toDate(),
                createAt: data.createAt.toDate(),
                updateAt: data.updateAt.toDate(),
            }
            if (change.type === "added") {
                newMemberships.push(membership)
            }
            if (change.type === "modified") {
                updatedMemberships.push({membership, index: change.newIndex})
            }
        });
        if(newMemberships.length > 0) {
            dispatch(receiveMemberships(newMemberships))
        }
        if(updatedMemberships.length > 0) {
            dispatch(updateMemberships(updatedMemberships))
        }
        
    })
    return membersipListener
}

export type RealtimeUpdateMembershipsType = typeof realtimeUpdateMemberships

export type ReceiveMembershipsType = typeof receiveMemberships



