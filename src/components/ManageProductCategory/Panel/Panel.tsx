import React from "react";
import { NavLink } from "react-router-dom";
import { productCategoryPath } from "../../../config/route-config";
import './Panel.scss'

export const ProductCategoryPanel = () => {

    return (
        <div className="product-category-panel">
            <NavLink
                to={`${productCategoryPath}/add`}
                className="product-category-panel__add"
                activeClassName="product-category-panel__add--active"
            >new</NavLink>
        </div>
    )
}