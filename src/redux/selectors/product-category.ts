import { IProductCategory } from "../../model/types/IProductCategory";

export const getProductCategoryIndexById = (categories: IProductCategory[], id: string) => {
    return categories.findIndex(category => category.id === id)
}

export const getActiveProductCategory = (categories: IProductCategory[]) => {
    return categories.filter(item => item.isDeleted === false)
}