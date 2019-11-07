import {combineReducers} from 'redux'
import { authReducer } from './auth'
import { productCategoryReducer } from './product-category'
import { productReducer } from './product'



export const rootReducer = combineReducers({
    user: authReducer,
    productCategory: productCategoryReducer,
    product: productReducer
})

export type RootState = ReturnType<typeof rootReducer>