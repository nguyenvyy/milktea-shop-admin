import { IDiscount } from "../../model/IDiscount"

export const getDiscountIndexById = (discounts: IDiscount[], id: string) => {
    return discounts.findIndex(discount => discount.id === id)
}