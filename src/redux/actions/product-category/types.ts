import { IProductCategory } from "../../../model/types/IProductCategory"

export const ADD_PRODUCT_CATEGORY = 'ADD_PRODUCT_CATEGORY'
export const DELETE_PRODUCT_CATEGORY = 'DELETE_PRODUCT_CATEGORY'
export const EDIT_PRODUCT_CATEGORY = 'EDIT_PRODUCT_CATEGORY'

export const RECEIVE_PRODUCT_CATEGORIES = 'RECEIVE_PRODUCT_CATEGORIES'
export const REQUEST_PRODUCT_CATEGORY = 'REQUEST_PRODUCT_CATEGORY'
export const STOP_REQUEST_PRODUCT_CATEGORY = 'STOP_REQUEST_PRODUCT_CATEGORY'

export interface AddProductCategoryAction {
    type: typeof ADD_PRODUCT_CATEGORY,
    payload: IProductCategory
}

export interface DeleteProductCategoryAction {
    type: typeof DELETE_PRODUCT_CATEGORY,
    payload: string
}

export interface EditProductCategoryAction {
    type: typeof EDIT_PRODUCT_CATEGORY,
    payload: IProductCategory
}


export interface ReceiveProductCategoriesAction {
    type: typeof RECEIVE_PRODUCT_CATEGORIES,
    payload: IProductCategory[]
}

export interface RequestProductCategoryAction {
    type: typeof REQUEST_PRODUCT_CATEGORY
}

export interface StopRequestProductCategoryAction {
    type: typeof STOP_REQUEST_PRODUCT_CATEGORY
}

export type ProductCategoryActionTypes = (
    ReceiveProductCategoriesAction |
    AddProductCategoryAction |
    DeleteProductCategoryAction |
    EditProductCategoryAction |
    RequestProductCategoryAction |
    StopRequestProductCategoryAction
)

export interface ProductCategoryState {
    items: IProductCategory[],
    isFeatching: Boolean
} 
