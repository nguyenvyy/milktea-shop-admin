import { FirebaseServices } from "../../../services/firebase"
import { collections, sub_collections, types_docs } from "../../../constant/FirebaseEnum"
import { IProductCategory } from "../../../model/types/IProductCategory";


export const getProductCategoriesAPI = async () => {
    const categoryCollectionRef = FirebaseServices.generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types)
    try {
        const querySnapshot = await categoryCollectionRef.get();
        return querySnapshot.docs.map(doc => doc.data());
    }
    catch (error) {
        return [error, 500]
    }
}

export const addProductCategoryAPI = async (category: IProductCategory) => {
    const categoryDocsRef = FirebaseServices.generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types).doc()
    const id = categoryDocsRef.id

    try {
        const newCategory = { ...category, id }
        categoryDocsRef.set(newCategory)
        return newCategory
    } catch (error) {
        return [error, 500]
    }
}

export const updateProductCategoryAPI  = async (category: IProductCategory) => {
    const categoryDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types)
        .doc(category.id)
    try {
        const categoryClone: IProductCategory = {...category, updateAt: new Date()}
        delete categoryClone.createAt
        delete categoryClone.id
        categoryDocsRef.update(categoryClone).then(res => console.log(res))
        return {...category, ...categoryClone}
    } catch (error) {
        return [error, 500]
    }
}

export const deleteProductCategoryAPI  = async (id: string) => {
    const categoryDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types)
        .doc(id)
    try {
        categoryDocsRef.update({isDeleted: true})
        return id
    } catch (error) {
        return [error, 500]
    }
}