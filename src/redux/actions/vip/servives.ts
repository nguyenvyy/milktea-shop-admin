import { FirebaseServices } from "../../../services/firebase"
import { collections, sub_collections, types_docs } from "../../../constant/FirebaseEnum"
import { IVIP } from "../../../model/IVIP";
import { undefinedError } from "../../../constant";

export const getVIPsAPI = async () => {
    const vipCollectionRef = FirebaseServices
    .generalLV1SubCollectionRef(
        collections.types, 
        types_docs.vips, 
        sub_collections.types
        )
    try {
        const querySnapshot = await vipCollectionRef.orderBy("createAt", "desc").get();
        return querySnapshot.docs.map(doc => {
            const vip: IVIP = {
                id: doc.data().id,
                name: doc.data().name,
                point: doc.data().point,
                createAt: doc.data().createAt.toDate(),
                updateAt: doc.data().updateAt.toDate(),
            }
            return vip
        });
    }
    catch (error) {
        return [error, undefinedError]
    }
}

export const addVIPAPI = async (vip: IVIP) => {
    const vipDocsRef = FirebaseServices.generalLV1SubCollectionRef(collections.types, types_docs.vips, sub_collections.types).doc()
    const id = vipDocsRef.id
    try {
        const newvip = { ...vip, id, createAt: new Date(), updateAt: new Date() }
        vipDocsRef.set(newvip)
        return newvip
    } catch (error) {
        return [error, undefinedError]
    }
}

export const updateVIPAPI  = async (vip: IVIP) => {
    const vipDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.vips, sub_collections.types)
        .doc(vip.id)
    try {
        const vipClone: IVIP = {...vip, updateAt: new Date()}
        delete vipClone.createAt
        delete vipClone.id
        vipDocsRef.update(vipClone)
        return {...vip, ...vipClone}
    } catch (error) {
        return [error, undefinedError]
    }
}

export const deleteVIPAPI  = async (id: string) => {
    const vipDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.vips, sub_collections.types)
        .doc(id)
    try {
        vipDocsRef.update({isDeleted: true})
        return id
    } catch (error) {
        return [error, undefinedError]
    }
}