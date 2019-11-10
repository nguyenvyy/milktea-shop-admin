import { IDiscount } from "../../../model/IDiscount";
import { AddDiscountAction, ADD_DISCOUNT, DeleteDiscountAction, DELETE_DISCOUNT, EditDiscountAction, EDIT_DISCOUNT, RequestDiscountAction, REQUEST_DISCOUNT, STOP_REQUEST_DISCOUNT, StopRequestDiscountAction, ReceiveDiscountsAction, RECEIVE_DISCOUNTS } from "./types";
import { getDiscountsAPI, addDiscountAPI, updateDiscountAPI, deleteDiscountAPI } from "./servives";
import { undefinedError, success } from "../../../constant";

import '../constant-type/actions.ts'

const addDiscount = (discount: IDiscount): AddDiscountAction => ({
    type: ADD_DISCOUNT,
    payload: discount
})

const deleteDiscount = (id: string): DeleteDiscountAction => ({
    type: DELETE_DISCOUNT,
    payload: id
})

const editDiscount = (discount: IDiscount): EditDiscountAction => ({
    type: EDIT_DISCOUNT,
    payload: discount
})

const requestDiscount = (): RequestDiscountAction => ({
    type: REQUEST_DISCOUNT
})

const stopRequestDiscount = (): StopRequestDiscountAction => ({
    type:STOP_REQUEST_DISCOUNT
})

const receiveDiscounts = (discounts: IDiscount[]): ReceiveDiscountsAction => ({
    type: RECEIVE_DISCOUNTS,
    payload: discounts
})

export const fetchDiscounts = () => (dispatch: any) => {
    dispatch(requestDiscount())
    return getDiscountsAPI()
    .then(discounts => {
        dispatch(stopRequestDiscount())
        if(discounts[1] === undefinedError) {
            return undefinedError
        }
        dispatch(receiveDiscounts(discounts))
        return success
    })
}

export const requestAddDiscount = (discount: IDiscount) => (dispatch: any) => {
    dispatch(requestDiscount())
    return addDiscountAPI(discount)
        .then((newDiscount: any | IDiscount) => {
            dispatch(stopRequestDiscount())
            if(newDiscount[1] === undefinedError) {
                return undefinedError
            }
            dispatch(addDiscount(newDiscount))
            return success
        })
}

export const requestEditDiscount = (discount: IDiscount) => (dispatch: any) => {
    dispatch(requestDiscount())
    return updateDiscountAPI(discount)
        .then((newDiscount: any | IDiscount) => {
            dispatch(stopRequestDiscount())
            if(newDiscount[1] === undefinedError) {
                return undefinedError
            }
            dispatch(editDiscount(newDiscount))
            return success
        })
}

export const requestDeleteDiscount = (id: string) => (dispatch: any) => {
    dispatch(requestDiscount())
    return deleteDiscountAPI(id)
        .then((id: any | string) => {
            dispatch(stopRequestDiscount())
            if(id[1] === undefinedError) {
                return undefinedError
            }
            dispatch(deleteDiscount(id))
            return success
        })
}
