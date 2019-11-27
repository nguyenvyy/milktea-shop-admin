import React from "react";
import { Table, Divider, Badge, message } from "antd";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";

import "./ListDiscount.scss";
import { undefinedError, success, status } from "../../../constant";
import { IDiscount } from "../../../model/IDiscount";
import { NavLink } from "react-router-dom";
import { discountPath } from "../../../config/route-config";
import { formatDate } from "../../../constant";
import { formatVND } from "../../utils";
export const ListDiscount = ({
    isFetching,
    requestEditDiscount,
    requestDeleteDiscount,
    discounts,
}: any) => {

    const handleDeleteDiscount = (discount: IDiscount) => {
        requestDeleteDiscount(discount.id).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("delete fail", 1)
                    break;
                case success:
                    message.success(`${discount.name} deleted`, 1)
                    break;
                default:
                    break;
            }
        })
    }

    const handleActiveDiscount = (discount: IDiscount) => {
        const newDiscount: IDiscount = {
            ...discount,
            isDeleted: false
        }
        requestEditDiscount(newDiscount).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("active fail", 1)
                    break;
                case success:
                    message.success(`${discount.name} actived`, 1)
                    break;
                default:
                    break;
            }
        })
    }

    const columns: ColumnProps<IDiscount>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (value: number) => formatVND(value),
            sorter: (a: IDiscount, b: IDiscount) => a.value - b.value
        },
        {
            title: 'Gived',
            dataIndex: 'givedCount',
            key: 'givedCount',
            render: (givedCount: number) => formatVND(givedCount),
            sorter: (a: IDiscount, b: IDiscount) => a.givedCount - b.givedCount,
            align: 'center'
            
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration: number) => formatVND(duration),
            sorter: (a: IDiscount, b: IDiscount) => a.duration - b.duration,
            align: 'center'
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
            )
        },
        {
            title: 'Create at',
            key: 'createAt',
            dataIndex: 'createAt',
            render: createAt => moment(createAt, formatDate).format(formatDate)
        },
        {
            title: 'Update at',
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
                                    onClick={() => handleDeleteDiscount(record)}>stop</span>
                                <Divider type="vertical" />
                                <NavLink
                                    activeClassName="action--active"
                                    to={`${discountPath}/give/${record.id}`}>give</NavLink>
                                <Divider type="vertical" />
                            </>
                        ) : (
                                <>
                                    <span className="action-delete"
                                        onClick={() => handleActiveDiscount(record)}>active</span>
                                    <Divider type="vertical" />
                                </>
                            )
                        }
                        <NavLink
                            activeClassName="action--active"
                            to={`${discountPath}/edit/${record.id}`}>edit</NavLink>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="list-discount">
            <Table
                size="small"
                loading={isFetching}
                rowKey={record => record.id}
                columns={columns}
                dataSource={discounts.length > 0 ? discounts : null}
            />
        </div>
    )
}