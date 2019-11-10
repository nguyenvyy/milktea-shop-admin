import React from "react";
import { NavLink } from "react-router-dom";
import { discountPath } from "../../../config/route-config";
import './Panel.scss'

export const DiscountPanel = () => {
    return (
        <div className="discount-panel">
            <NavLink
                to={`${discountPath}/add`}
                className="discount-panel__add"
                activeClassName="discount-panel__add--active"
            >new</NavLink>
        </div>
    )
}   