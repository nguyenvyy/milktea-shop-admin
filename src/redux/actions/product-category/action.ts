import { AddProductCategoryAction, ADD_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, DeleteProductCategoryAction, EditProductCategoryAction, EDIT_PRODUCT_CATEGORY, RequestProductCategoryAction, REQUEST_PRODUCT_CATEGORY, StopRequestProductCategoryAction, STOP_REQUEST_PRODUCT_CATEGORY, ReceiveProductCategoriesAction, RECEIVE_PRODUCT_CATEGORIES } from "./types"
import { IProductCategory } from "../../../model/types/IProductCategory"
import { getProductCategoriesAPI, addProductCategoryAPI, updateProductCategoryAPI, deleteProductCategoryAPI } from "./service"
import { undefinedError, success } from "../../../constant"
import { any } from "prop-types"

export const addProductCategory = (category: IProductCategory): AddProductCategoryAction =>({
    type: ADD_PRODUCT_CATEGORY,
    payload: category
})

export const deleteProductCategory = (id: string): DeleteProductCategoryAction => ({
    type: DELETE_PRODUCT_CATEGORY,
    payload: id
})

export const editProductCategory = (category: IProductCategory): EditProductCategoryAction => ({
    type: EDIT_PRODUCT_CATEGORY,
    payload: category
})

export const requestProductCategory = (): RequestProductCategoryAction => ({
    type: REQUEST_PRODUCT_CATEGORY
})

export const stopRequestProductCategory = (): StopRequestProductCategoryAction => ({
    type:STOP_REQUEST_PRODUCT_CATEGORY
})

export const receiveProductCategories = (categories: IProductCategory[]): ReceiveProductCategoriesAction => ({
    type: RECEIVE_PRODUCT_CATEGORIES,
    payload: categories
})  

export const featchProductCategories = () => (dispatch: any) => {
    dispatch(requestProductCategory())
    return getProductCategoriesAPI()
    .then(categories => {
        dispatch(stopRequestProductCategory())
        if(categories[1] === undefinedError) {
            return undefinedError
        }
        dispatch(receiveProductCategories(categories))
        return success
    })
}

export const requestAddProductCategory = (category: IProductCategory) => (dispatch: any) => {
    dispatch(requestProductCategory())
    return addProductCategoryAPI(category)
        .then((newCategory: any | IProductCategory) => {
            dispatch(stopRequestProductCategory())
            if(newCategory[1] === undefinedError) {
                return undefinedError
            }
            dispatch(addProductCategory(newCategory))
            return success
        })
}

export const requestEditProductCategory = (category: IProductCategory) => (dispatch: any) => {
    dispatch(requestProductCategory())
    return updateProductCategoryAPI(category)
        .then((newCategory: any | IProductCategory) => {
            dispatch(stopRequestProductCategory())
            if(newCategory[1] === undefinedError) {
                return undefinedError
            }
            dispatch(editProductCategory(category))
            return success
        })
}

export const requestDeleteProductCategory = (id: string) => (dispatch: any) => {
    dispatch(requestProductCategory())
    return deleteProductCategoryAPI(id)
        .then((id: any | string) => {
            dispatch(stopRequestProductCategory())
            if(id[1] === undefinedError) {
                return undefinedError
            }
            dispatch(deleteProductCategory(id))
            return success
        })
}