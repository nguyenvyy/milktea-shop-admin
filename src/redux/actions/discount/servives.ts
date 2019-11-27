import { FirebaseServices } from "../../../services/firebase"
import { collections, sub_collections, types_docs } from "../../../constant/FirebaseEnum"
import { IDiscount, Reward } from "../../../model/IDiscount";
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
                givedCount: doc.data().givedCount,
                id: doc.data().id,
                name: doc.data().name,
                value: doc.data().value,
                duration: doc.data().duration,
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
        await discountDocsRef.set(newdiscount)
        return newdiscount
    } catch (error) {
        return [error, undefinedError]
    }
}

export const updateDiscountAPI = async (discount: IDiscount) => {
    const discountDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.discounts, sub_collections.types)
        .doc(discount.id)
    try {
        const discountClone: IDiscount = { ...discount, updateAt: new Date() }
        delete discountClone.createAt
        delete discountClone.id
        await discountDocsRef.update(discountClone)
        return { ...discount, ...discountClone }
    } catch (error) {
        return [error, undefinedError]
    }
}

export const updateGivedCountDiscountAPI = async (discount: IDiscount, increase: number) => {
    const discountDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.discounts, sub_collections.types)
        .doc(discount.id)
    try {
        const updateAt = new Date()
        const discountClone: any = { givedCount: FirebaseServices.firestore.FieldValue.increment(increase), updateAt }
        await discountDocsRef.update(discountClone)
        return { ...discount, updateAt, givedCount: discount.givedCount + increase }
    } catch (error) {
        return [error, undefinedError]
    }
}

export const deleteDiscountAPI = async (id: string) => {
    const discountDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.discounts, sub_collections.types)
        .doc(id)
    try {
        await discountDocsRef.update({ isDeleted: true })
        return id
    } catch (error) {
        return [error, undefinedError]
    }
}

export const giveDiscountAPI = (idMembership: string, reward: Reward) => {
    const rewardDoc = FirebaseServices.db
        .collection(collections.rewards)
        .doc(idMembership)
        .collection(sub_collections.types)
        .doc()

    return rewardDoc.set({ ...reward, id: rewardDoc.id })
}