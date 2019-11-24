import { FirebaseServices } from "../../../services/firebase"
import { collections, order_docs, sub_collections } from "../../../constant/FirebaseEnum"

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