import {combineReducers} from 'redux'
import { authReducer } from './auth'
import { productCategoryReducer } from './product-category'
import { productReducer } from './product'
import { vipReducer } from './vip'
import { discountReducer } from './discount'
import { constantTypeReducer } from './constant-type'
import { employeeReducer } from './employee'
import { membershipReducer } from './membership'
import { processingOrderReducer } from './processing-order'
import { processedOrderReducer } from './processed-order'



export const rootReducer = combineReducers({
    auth: authReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    vip: vipReducer,
    discount: discountReducer,
    constantType: constantTypeReducer,
    employee: employeeReducer,
    membership: membershipReducer,
    processingOrder: processingOrderReducer,
    processedOrder: processedOrderReducer
})
export type RootState = ReturnType<typeof rootReducer>