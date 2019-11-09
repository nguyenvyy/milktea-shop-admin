import React from "react";
import { NavLink } from "react-router-dom";
import { vipPath } from "../../../config/route-config";
import './Panel.scss'

export const VIPPanel = () => {
    return (
        <div className="vip-panel">
            <NavLink
                to={`${vipPath}/add`}
                className="vip-panel__add"
                activeClassName="vip-panel__add--active"
            >new</NavLink>
        </div>
    )
}