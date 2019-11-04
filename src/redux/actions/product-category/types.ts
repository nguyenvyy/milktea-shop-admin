import { IProductCategory } from "../../../model/types/IProductCategory"

export const ADD_PRODUCT_CATEGORY = 'ADD_PRODUCT_CATEGORY'
export const DELETE_PRODUCT_CATEGORY = 'DELETE_PRODUCT_CATEGORY'
export const EDIT_PRODUCT_CATEGORY = 'EDIT_PRODUCT_CATEGORY'

export const RECEIVE_PRODUCT_CATEGORYS = 'RECEIVE_PRODUCT_CATEGORYS'
export const REQUEST_PRODUCT_CATEGORY = 'REQUEST_PRODUCT_CATEGORY'
export const STOP_REQUEST_PRODUCT_CATEGORY = 'STOP_REQUEST_PRODUCT_CATEGORY'

interface AddProductCategoryAction {
    type: typeof ADD_PRODUCT_CATEGORY,
    payload: IProductCategory
}


interface DeleteProductCategoryAction {
    type: typeof DELETE_PRODUCT_CATEGORY,
    id: string
}


interface EditProductCategoryAction {
    type: typeof EDIT_PRODUCT_CATEGORY,
    payload: IProductCategory
}
