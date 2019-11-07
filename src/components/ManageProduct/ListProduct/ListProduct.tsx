import React from "react";

import "./ListProduct.scss";
import { Table, Badge, Divider } from "antd";
import { IProduct } from "../../../model/types/IProduct";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";
import { formatDate } from "../../../constant";
import { NavLink } from "react-router-dom";
import { productPath } from "../../../config/route-config";
export const ListProduct = ({
    products,
    categories,
    isFeatching
}: any) => {

    const columns: ColumnProps<IProduct>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (categoryId: string) => {
                const category:any = categories.find((item:any) => item.id === categoryId)
                return category ? category.name : 'loading...'
            }
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: isDeleted => (
                <>
                    {!isDeleted ?
                        <Badge status="success" text="Đang hoạt động" /> :
                        <Badge status="error" text="Đã dừng" />
                    }
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {

                return (
                    <div className="action">
                        {!record.isDeleted ? (
                            <>
                                <span className="action-delete"
                                // onClick={() => handleDeleteCategory(record)}
                                >stop</span>
                                <Divider type="vertical" />
                                <NavLink
                                    activeClassName="action--active"
                                    to={`${productPath}/detail/${record.id}`}>view</NavLink>
                                <Divider type="vertical" />
                            </>
                        ) : (
                                <>
                                    <span className="action-delete"
                                    // onClick={() => handleActiveCategory(record)}
                                    >active</span>
                                    <Divider type="vertical" />
                                </>
                            )
                        }
                        <NavLink
                            activeClassName="action--active"
                            to={`${productPath}/edit/${record.id}`}>edit</NavLink>

                    </div>
                )
            }
        }
    ];
    return (
        <div className="list-product">
            <Table
                loading={isFeatching}
                rowKey={record => record.id}
                columns={columns}
                dataSource={products.length > 0 ? products : null}
            />
        </div>
    )
}