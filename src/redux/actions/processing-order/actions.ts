import { IOrder } from "../../../model/IOrder";
import {
    ReceiveProcessingOrdersAction,
    RECEIVE_PROCESSING_ORDERS,
    UpdateProcessingOrdersAction,
    UPDATE_PROCESSING_ORDERS,
    DeleteProcessingOrdersAction,
    DELETE_PROCESSING_ORDERS,
    IUpdatedProcessingOrder
} from "./types";
import { Dispatch } from "redux";
import { FirebaseServices } from "../../../services/firebase";
import { collections, order_docs, sub_collections } from "../../../constant/FirebaseEnum"

const receiveProcessingOrders = (orders: IOrder[]): ReceiveProcessingOrdersAction => ({
    type: RECEIVE_PROCESSING_ORDERS,
    payload: orders
})

const updateProcessingOrders = (updatedOrders: IUpdatedProcessingOrder[]): UpdateProcessingOrdersAction => ({
    type: UPDATE_PROCESSING_ORDERS,
    payload: updatedOrders
})

const deleteProcessingOrders = (deletedIds: number[]): DeleteProcessingOrdersAction => ({
    type: DELETE_PROCESSING_ORDERS,
    payload: deletedIds
})

export const realtimeUpdateProcessingOrders = () => (dispatch: Dispatch) => {
    const processingOrderListener = FirebaseServices.db
        .collection(collections.orders)
        .doc(order_docs.processing)
        .collection(sub_collections.types)
        .orderBy('createAt', 'desc')
        .onSnapshot(querySnap => {
            let newOrders: Array<IOrder> = []
            let updatedOrders: Array<IUpdatedProcessingOrder> = []
            let deletedOrderIds: Array<number> = []

            querySnap.docChanges().forEach(function (change) {
                const data: any = change.doc.data()
                const order: IOrder = {
                    ...data,
                    createAt: data.createAt.toDate(),
                    updateAt: data.updateAt.toDate(),
                }
                if (change.type === "added") {
                    newOrders.push(order)
                }
                if (change.type === "modified") {
                    updatedOrders.push({ order, index: change.newIndex })
                }
                if (change.type === 'removed') {
                    deletedOrderIds.push(change.oldIndex)
                }
                
            });
            if(newOrders.length > 0) {
                dispatch(receiveProcessingOrders(newOrders))
            }
            if(updatedOrders.length > 0) {
                dispatch(updateProcessingOrders(updatedOrders))
            }
            if(deletedOrderIds.length > 0) {
                dispatch(deleteProcessingOrders(deletedOrderIds))
            }
        })
    return processingOrderListener
}