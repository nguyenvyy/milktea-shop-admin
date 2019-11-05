import { IProduct } from "../../model/types/IProduct"


export const getProductIndexById = (products: IProduct[], id: string) => {
    return products.findIndex(products => products.id === id)
}