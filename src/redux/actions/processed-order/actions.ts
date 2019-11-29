import { IOrder } from "../../../model/IOrder";
import {
    ReceiveProcessedOrdersAction,
    RECEIVE_PROCESSED_ORDERS,
    UpdateProcessedOrdersAction,
    UPDATE_PROCESSED_ORDERS,
    IUpdatedProcessedOrder
} from "./types";
import { Dispatch } from "redux";
import { FirebaseServices } from "../../../services/firebase";
import { collections, order_docs, sub_collections } from "../../../constant/FirebaseEnum"

const receiveProcessedOrders = (orders: IOrder[]): ReceiveProcessedOrdersAction => ({
    type: RECEIVE_PROCESSED_ORDERS,
    payload: orders
})

const updateProcessedOrders = (updatedOrders: IUpdatedProcessedOrder[]): UpdateProcessedOrdersAction => ({
    type: UPDATE_PROCESSED_ORDERS,
    payload: updatedOrders
})


export const realtimeUpdateProcessedOrders = () => (dispatch: Dispatch) => {
    const processedOrderListener = FirebaseServices.db
        .collection(collections.orders)
        .doc(order_docs.processed)
        .collection(sub_collections.types)
        .limit(100)
        .orderBy('paidAt', 'desc')
        .where('paidAt', '>=', new Date(1,1,2019))
        .onSnapshot(querySnap => {
            let newOrders: Array<IOrder> = []
            let updatedOrders: Array<IUpdatedProcessedOrder> = []

            querySnap.docChanges().forEach(function (change) {
                const data: any = change.doc.data()
                let order: IOrder = {
                    ...data,
                    createAt: data.createAt.toDate(),
                    updateAt: data.updateAt.toDate(),
                }

                if(order.paidAt !== undefined) {
                    order.paidAt = data.paidAt.toDate()
                }

                if (change.type === "added") {
                    newOrders.push(order)
                }
                if (change.type === "modified") {
                    updatedOrders.push({ order, index: change.newIndex })
                }
                
            });
            if(newOrders.length > 0) {
                dispatch(receiveProcessedOrders(newOrders))
            }
            if(updatedOrders.length > 0) {
                dispatch(updateProcessedOrders(updatedOrders))
            }
        })
    return processedOrderListener
}