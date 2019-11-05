import { IProductCategory } from "../../model/types/IProductCategory";

export const getProductCategoryIndexById = (categories: IProductCategory[], id: string) => {
    return categories.findIndex(category => category.id === id)
}