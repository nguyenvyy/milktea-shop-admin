import { IProduct } from "../../../model/types/IProduct"
import { AddProductAction, ADD_PRODUCT, DeleteProductAction, DELETE_PRODUCT, EditProductAction, EDIT_PRODUCT, RequestProductAction, REQUEST_PRODUCT, StopRequestProductAction, STOP_REQUEST_PRODUCT, RECEIVE_PRODUCTS, ReceiveProductsAction } from "./types"
import { getProductsAPI, addProductAPI, updateProductAPI, deleteProductAPI } from "./services"
import { success, undefinedError } from "../../../constant"


export const addProduct = (product: IProduct): AddProductAction =>({
    type: ADD_PRODUCT,
    payload: product
})

export const deleteProduct = (id: string): DeleteProductAction => ({
    type: DELETE_PRODUCT,
    payload: id
})

export const editProduct = (product: IProduct): EditProductAction => ({
    type: EDIT_PRODUCT,
    payload: product
})

export const requestProduct = (): RequestProductAction => ({
    type: REQUEST_PRODUCT
})

export const stopRequestProduct = (): StopRequestProductAction => ({
    type:STOP_REQUEST_PRODUCT
})

export const receiveProducts = (products: IProduct[]): ReceiveProductsAction => ({
    type: RECEIVE_PRODUCTS,
    payload: products
}) 

export const featchProducts = () => (dispatch: any) => {
    dispatch(requestProduct())
    return getProductsAPI()
    .then(products => {
        dispatch(stopRequestProduct())
        if(products[1] === undefinedError) {
            return undefinedError
        }
        dispatch(receiveProducts(products))
        return success
    })
}

export const requestAddProduct = (product: IProduct) => (dispatch: any) => {
    dispatch(requestProduct())
    return addProductAPI(product)
        .then((newProduct: any | IProduct) => {
            dispatch(stopRequestProduct())
            if(newProduct[1] === undefinedError) {
                return undefinedError
            }
            dispatch(addProduct(newProduct))
            return success
        })
}

export const requestEditProduct = (product: IProduct) => (dispatch: any) => {
    dispatch(requestProduct())
    return updateProductAPI(product)
        .then((newCategory: any | IProduct) => {
            dispatch(stopRequestProduct())
            if(newCategory[1] === undefinedError) {
                return undefinedError
            }
            dispatch(editProduct(product))
            return success
        })
}

export const requestDeleteProductCategory = (id: string) => (dispatch: any) => {
    dispatch(requestProduct())
    return deleteProductAPI(id)
        .then((id: any | string) => {
            dispatch(stopRequestProduct())
            if(id[1] === undefinedError) {
                return undefinedError
            }
            dispatch(deleteProduct(id))
            return success
        })
}