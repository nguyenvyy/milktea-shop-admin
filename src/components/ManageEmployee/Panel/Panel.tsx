import React from "react";
import { NavLink } from "react-router-dom";

import "./Panel.scss";
import { employeePath } from "../../../config/route-config";

export const EmployeePanel = () => {
    return (
        <div className="employee-panel">
            <NavLink
                to={`${employeePath}/add`}
                className="employee-panel__add"
                activeClassName="employee-panel__add--active"
            >new</NavLink>
        </div>
    )
}