import { FirebaseServices } from "../../../services/firebase"
import { collections, order_docs, sub_collections } from "../../../constant/FirebaseEnum"
import { IOrder } from "../../../model/IOrder"

export const updateProcessingOrderAPI = (id: string, update: object) => {
    return FirebaseServices.db
        .collection(collections.orders)
        .doc(order_docs.processing)
        .collection(sub_collections.types)
        .doc(id).update(update)
}

export const deleteProcessingOrderAPI = (id: string) => {
    return FirebaseServices.db
        .collection(collections.orders)
        .doc(order_docs.processing)
        .collection(sub_collections.types)
        .doc(id).delete()
}

export const addOrderToProcessedOrder = (order: IOrder) => {
    return FirebaseServices.db
        .collection(collections.orders)
        .doc(order_docs.processed)
        .collection(sub_collections.types)
        .doc(order.id).set({ ...order })
}

export const updatePointForMembership = (idMembership: string, increase: number) => {
    return FirebaseServices.db
        .collection(collections.memberships)
        .doc(idMembership)
        .update({
            updateAt: new Date(),
            point: FirebaseServices.firestore.FieldValue.increment(increase)
        })
}

export const updateOrderCountForEmployee = (idEmployee: string) => {
    return FirebaseServices.db
        .collection(collections.employees)
        .doc(idEmployee)
        .update({
            updateAt: new Date(),
            orderCount: FirebaseServices.firestore.FieldValue.increment(1)
        })
}

export const addOrderToProcessedOrderMock = (order: IOrder) => {

    const docRef = FirebaseServices.db
        .collection(collections.orders)
        .doc(order_docs.processed)
        .collection(sub_collections.types)
        .doc()
    return docRef.set({ ...order, id: docRef.id })
}
