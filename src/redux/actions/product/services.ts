import { FirebaseServices } from "../../../services/firebase"
import { collections } from "../../../constant/FirebaseEnum"
import { undefinedError } from "../../../constant";
import { IProduct } from "../../../model/types/IProduct";

export const getProductsAPI = async () => {
    const productCollectionRef = FirebaseServices.db.collection(collections.products)
    try {
        const querySnapshot = await productCollectionRef.orderBy("createAt", "desc").get()
        return querySnapshot.docs.map(doc => {
            let data = doc.data();
            const product: IProduct = {
                id: data.id,
                name: data.name,
                price: data.price,
                categoryId: data.categoryId,
                updateAt: data.updateAt.toDate(),
                createAt: data.createAt.toDate(),
                isDeleted: data.isDeleted,
                imgURL: data.imgURL,
            }
            return product
        })

    } catch (error) {
        return [error, undefinedError]
    }
}

export const addProductAPI = async (product: IProduct) => {
    const productDocRef = FirebaseServices.db.collection(collections.products).doc()
    const id = productDocRef.id

    try {
        const newProduct = { ...product, id }
        productDocRef.set(newProduct)
        return newProduct
    } catch (error) {
        return [error, undefinedError]
    }
}

export const updateProductAPI  = async (product: IProduct) => {
    const productDocRef = FirebaseServices.db.collection(collections.products).doc(product.id)
    try {
        const productClone: IProduct = {...product, updateAt: new Date()}
        productDocRef.update(productClone)
        return {...product, ...productClone}
    } catch (error) {
        return [error, undefinedError]
    }
}

export const deleteProductAPI  = async (id: string) => {
    const productDocRef = FirebaseServices.db.collection(collections.products).doc(id)
    try {
        productDocRef.update({isDeleted: true})
        return id
    } catch (error) {
        return [error, undefinedError]
    }
}