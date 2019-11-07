import React from "react";

import "./EditProduct.scss";
import { IProductCategory } from "../../../model/types/IProductCategory";
import { IProduct } from "../../../model/types/IProduct";
import { RequestEditProductType } from "../../../redux/actions/product/actions";
export const EditProduct = ({
    categories,
    product,
    requestEditProduct
}: {
    categories: IProductCategory[],
    product: IProduct,
    requestEditProduct: RequestEditProductType
}) => {
    return (
        <div>EditProduct</div>
    )
}