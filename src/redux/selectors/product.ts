import { IProduct } from "../../model/IProduct"


export const getProductIndexById = (products: IProduct[], id: string) => {
    return products.findIndex(products => products.id === id)
}
