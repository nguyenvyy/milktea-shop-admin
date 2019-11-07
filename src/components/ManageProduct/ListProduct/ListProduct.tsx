import React from "react";

import "./ListProduct.scss";
import { Table, Badge, Divider, message } from "antd";
import { IProduct } from "../../../model/types/IProduct";
import { ColumnProps } from "antd/lib/table";
import { NavLink } from "react-router-dom";
import { productPath } from "../../../config/route-config";
import { undefinedError, success, status } from "../../../constant";
import { IProductCategory } from "../../../model/types/IProductCategory";
export const ListProduct = ({
    products = [],
    categories,
    isFetching,
    requestDeleteProduct,
    requestEditProduct
}: any) => {

    const handleActiveProduct = (product: IProduct) => {
        const newProduct: IProduct = {
            ...product,
            isDeleted: false,
        }
        requestEditProduct(newProduct).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("Active fail", 1)
                    break;
                case success:
                    message.success(`${product.name} actived`, 1)
                    break;
                default:
                    break;
            }
        })
    }
    const handleDeleteProduct = (product: IProduct) => {
        requestDeleteProduct(product.id).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("Delete fail", 1)
                    break;
                case success:
                    message.success(`${product.name} deleted`, 1)
                    break;
                default:
                    break;
            }
        })
    }
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
            sorter: (a: IProduct, b: IProduct) => a.price - b.price
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (categoryId: string) => {
                const category: any = categories.find((item: any) => item.id === categoryId)
                return category ? category.name : 'loading...'
            },
            filters: categories.map((item: IProductCategory) =>( {text: item.name, value: item.id})),
            onFilter: (value, record) => value === record.categoryId,
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: isDeleted => (
                <>
                    {!isDeleted ?
                        <Badge status="success" text={status.active} /> :
                        <Badge status="error" text={status.stop} />
                    }
                </>
            ),
            filters: [
                { text: status.active, value: false },
                { text: status.stop, value: true },
            ],
            onFilter: (value, record) => record.isDeleted === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: IProduct) => {

                return (
                    <div className="action">
                        {!record.isDeleted ? (
                            <>
                                <span className="action-delete"
                                    onClick={() => handleDeleteProduct(record)}
                                >stop</span>
                                <Divider type="vertical" />
                                <NavLink
                                    activeClassName="action--active"
                                    to={`${productPath}/edit/${record.id}`}>edit</NavLink>
                                <Divider type="vertical" />
                            </>
                        ) : (
                                <>
                                    <span className="action-delete"
                                        onClick={() => handleActiveProduct(record)}
                                    >active</span>
                                    <Divider type="vertical" />
                                </>
                            )
                        }
                        <NavLink
                            activeClassName="action--active"
                            to={`${productPath}/detail/${record.id}`}>view</NavLink>
                    </div>
                )
            }
        }
    ];
    return (
        <div className="list-product">
            <Table
                loading={isFetching}
                rowKey={record => record.id}
                columns={columns}
                dataSource={products.length > 0 ? products : null}
            />
        </div>
    )
}