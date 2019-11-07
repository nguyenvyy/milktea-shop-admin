import React from "react";
import { Table, Divider, Badge, message } from "antd";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";

import "./ListProductCategory.scss";
import { undefinedError, success } from "../../../constant";
import { IProductCategory } from "../../../model/types/IProductCategory";
import { NavLink } from "react-router-dom";
import { productCategoryPath } from "../../../config/route-config";
import { formatDate } from "../../../constant";
export const ListProductCategory = ({
    isFetching,
    categories,
    requestDeleteProductCategory,
    requestEditProductCategory
}: any) => {

    const handleDeleteCategory = (category: IProductCategory) => {
        requestDeleteProductCategory(category.id).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("delete fail", 1)
                    break;
                case success:
                    message.success(`${category.name} deleted`, 1)
                    break;
                default:
                    break;
            }
        })
        console.log(category)
    }

    const handleActiveCategory = (category: IProductCategory) => {
        console.log(category)
        const newCategory: IProductCategory = {
            ...category,
            updateAt: new Date(),
            isDeleted: false
        }
        requestEditProductCategory(newCategory).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("active fail", 1)
                    break;
                case success:
                    message.success(`${category.name} actived`, 1)
                    break;
                default:
                    break;
            }
        })
    }

    const columns: ColumnProps<IProductCategory>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Create date',
            key: 'createAt',
            dataIndex: 'createAt',
            render: createAt => moment(createAt, formatDate).format(formatDate)
        },
        {
            title: 'Last update',
            key: 'updateAt',
            dataIndex: 'updateAt',
            render: updateAt => moment(updateAt, formatDate).format(formatDate)
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
                                    onClick={() => handleDeleteCategory(record)}>stop</span>
                                <Divider type="vertical" />
                            </>
                        ) : (
                                <>
                                    <span className="action-delete"
                                        onClick={() => handleActiveCategory(record)}>active</span>
                                    <Divider type="vertical" />
                                </>
                            )
                        }
                        <NavLink
                            activeClassName="action--active"
                            to={`${productCategoryPath}/edit/${record.id}`}>edit</NavLink>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="list-product-category">
            <Table
                loading={isFetching}
                rowKey={record => record.id}
                columns={columns}
                dataSource={categories.length > 0 ? categories : null}
            />
        </div>
    )
}