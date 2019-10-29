import {combineReducers} from 'redux'
import { authReducer } from './auth-reducer'

export const rootReducer = combineReducers({
    user: authReducer
})