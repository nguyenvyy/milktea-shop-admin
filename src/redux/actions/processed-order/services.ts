import { FirebaseServices } from "../../../services/firebase"
import { collections, order_docs, sub_collections } from "../../../constant/FirebaseEnum"

export const getOrderDetailAPI  = (idOrder: string) => {
    return FirebaseServices.db
        .collection(collections.orders)
        .doc(order_docs.processed)
        .collection(sub_collections.types)
        .doc(idOrder)
        .get()
}