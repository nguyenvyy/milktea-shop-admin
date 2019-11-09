import {combineReducers} from 'redux'
import { authReducer } from './auth'
import { productCategoryReducer } from './product-category'
import { productReducer } from './product'
import { vipReducer } from './vip'



export const rootReducer = combineReducers({
    user: authReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    vip: vipReducer
})

export type RootState = ReturnType<typeof rootReducer>