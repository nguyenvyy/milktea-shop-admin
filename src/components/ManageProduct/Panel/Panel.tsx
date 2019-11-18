import React from "react";
import { NavLink } from "react-router-dom";

import "./Panel.scss";
import { productPath } from "../../../config/route-config";
import { Form, Input } from "antd";

const { Search } = Input;
export const ProductPanel = ({
    handleSearchProducts
}: any) => {
    const onSearch = (e: string) => {
        handleSearchProducts(e.trim());
    }
    return (
        <div className="product-panel">
            <NavLink
                to={`${productPath}/add`}
                className="product-panel__add"
                activeClassName="product-panel__add--active"
            >new</NavLink>
            <div className="product-panel__search">
                <Form layout="inline">
                    <Form.Item label="Search" >
                        <Search onSearch={onSearch} placeholder="input product name"  enterButton />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}