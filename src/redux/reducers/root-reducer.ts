import {combineReducers} from 'redux'
import { authReducer } from './auth'
import { productCategoryReducer } from './product-category'

export const rootReducer = combineReducers({
    user: authReducer,
    productCategory: productCategoryReducer
})