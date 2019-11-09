import { IProduct } from "../../../model/IProduct"

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT'
export const STOP_REQUEST_PRODUCT = 'STOP_REQUEST_PRODUCT'

export interface AddProductAction {
    type: typeof ADD_PRODUCT,
    payload: IProduct
}

export interface DeleteProductAction {
    type: typeof DELETE_PRODUCT,
    payload: string
}

export interface EditProductAction {
    type: typeof EDIT_PRODUCT,
    payload: IProduct
}


export interface ReceiveProductsAction {
    type: typeof RECEIVE_PRODUCTS,
    payload: IProduct[]
}

export interface RequestProductAction {
    type: typeof REQUEST_PRODUCT
}

export interface StopRequestProductAction {
    type: typeof STOP_REQUEST_PRODUCT
}

export type ProductActionTypes = (
    ReceiveProductsAction |
    AddProductAction |
    DeleteProductAction |
    EditProductAction |
    RequestProductAction |
    StopRequestProductAction
)

export interface ProductState {
    items: IProduct[],
    isFetching: Boolean
} 
