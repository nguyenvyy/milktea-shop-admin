import { FirebaseServices } from "../../../services/firebase"
import { collections, sub_collections, types_docs } from "../../../constant/FirebaseEnum"
import { undefinedError } from "../../../constant";
import { IOrderState, IPaymentMethod, IRole } from '../../../model/constant-types-interface'



export const getOrderStatesAPI = async () => {
    const collectionRef = FirebaseServices
        .generalLV1SubCollectionRef(
            collections.types,
            types_docs.order_state,
            sub_collections.types
        )

    try {
        const querySnapshot = await collectionRef.get();
        return querySnapshot.docs.map((doc: any) => {
            const state: IOrderState = {
                ...doc.data()
            }
            return state
        })
    }
    catch (error) {
        return [error, undefinedError]
    }
}

export const getRolesAPI = async () => {
    const collectionRef = FirebaseServices
        .generalLV1SubCollectionRef(
            collections.types,
            types_docs.roles,
            sub_collections.types
        )

    try {
        const querySnapshot = await collectionRef.get();
        return querySnapshot.docs.map(doc => {
            const role: IRole = {
                id: doc.data().id,
                name: doc.data().name,
                value: doc.data().value
            }
            return role
        })
    }
    catch (error) {
        return [error, undefinedError]
    }
}

export const getPaymentMethodsAPI = async () => {
    const collectionRef = FirebaseServices
        .generalLV1SubCollectionRef(
            collections.types,
            types_docs.payment_method,
            sub_collections.types
        )

    try {
        const querySnapshot = await collectionRef.get();
        return querySnapshot.docs.map(doc => {
            const state: IPaymentMethod = {
                id: doc.data().id,
                name: doc.data().name
            }
            return state
        })
    }
    catch (error) {
        return [error, undefinedError]
    }
}