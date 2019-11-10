import { FirebaseServices } from "../../../services/firebase"
import { collections, sub_collections, types_docs } from "../../../constant/FirebaseEnum"
import { IDiscount } from "../../../model/IDiscount";
import { undefinedError } from "../../../constant";

export const getDiscountsAPI = async () => {
    const discountCollectionRef = FirebaseServices
    .generalLV1SubCollectionRef(
        collections.types, 
        types_docs.discounts, 
        sub_collections.types
        )
    try {
        const querySnapshot = await discountCollectionRef.orderBy("createAt", "desc").get();
        return querySnapshot.docs.map(doc => {
            const discount: IDiscount = {
                id: doc.data().id,
                name: doc.data().name,
                value: doc.data().value,
                code: doc.data().code,
                description: doc.data().description,
                minPoint: doc.data().point,
                isDeleted: doc.data().isDeleted,
                createAt: doc.data().createAt.toDate(),
                updateAt: doc.data().updateAt.toDate(),
            }
            return discount
        });
    }
    catch (error) {
        return [error, undefinedError]
    }
}

export const addDiscountAPI = async (discount: IDiscount) => {
    const discountDocsRef = FirebaseServices.generalLV1SubCollectionRef(collections.types, types_docs.discounts, sub_collections.types).doc()
    const id = discountDocsRef.id
    try {
        const newdiscount = { ...discount, id, createAt: new Date(), updateAt: new Date() }
        discountDocsRef.set(newdiscount)
        return newdiscount
    } catch (error) {
        return [error, undefinedError]
    }
}

export const updateDiscountAPI  = async (discount: IDiscount) => {
    const discountDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.discounts, sub_collections.types)
        .doc(discount.id)
    try {
        const discountClone: IDiscount = {...discount, updateAt: new Date()}
        delete discountClone.createAt
        delete discountClone.id
        discountDocsRef.update(discountClone)
        return {...discount, ...discountClone}
    } catch (error) {
        return [error, undefinedError]
    }
}

export const deleteDiscountAPI  = async (id: string) => {
    const discountDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.discounts, sub_collections.types)
        .doc(id)
    try {
        discountDocsRef.update({isDeleted: true})
        return id
    } catch (error) {
        return [error, undefinedError]
    }
}