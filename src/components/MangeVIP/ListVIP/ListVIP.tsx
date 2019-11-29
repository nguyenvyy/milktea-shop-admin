import React from "react";
import { Table, Divider, Badge, message } from "antd";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";

import "./ListVIP.scss";
import { undefinedError, success, status } from "../../../constant";
import { IVIP } from "../../../model/IVIP";
import { NavLink } from "react-router-dom";
import { vipPath } from "../../../config/route-config";
import { formatDate } from "../../../constant";
import { formatVND } from "../../utils";
export const ListVIP = ({
    isFetching,
    vips,
    requestDeleteVIP,
    requestEditVIP
}: any) => {

    const handleDeleteVIP = (vip: IVIP) => {
        requestDeleteVIP(vip.id).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("delete fail", 1)
                    break;
                case success:
                    message.success(`${vip.name} deleted`, 1)
                    break;
                default:
                    break;
            }
        })
    }

    const handleActiveVIP = (vip: IVIP) => {
        const newVIP: IVIP = {
            ...vip,
            isDeleted: false
        }
        requestEditVIP(newVIP).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("active fail", 1)
                    break;
                case success:
                    message.success(`${vip.name} actived`, 1)
                    break;
                default:
                    break;
            }
        })
    }

    const columns: ColumnProps<IVIP>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
            render: (point: number) => formatVND(point),
            sorter: (a: IVIP, b: IVIP) => a.point - b.point
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
                                    onClick={() => handleDeleteVIP(record)}>stop</span>
                                <Divider type="vertical" />
                            </>
                        ) : (
                                <>
                                    <span className="action-delete"
                                        onClick={() => handleActiveVIP(record)}>active</span>
                                    <Divider type="vertical" />
                                </>
                            )
                        }
                        <NavLink
                            activeClassName="action--active"
                            to={`${vipPath}/edit/${record.id}`}>edit</NavLink>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="list-vip">
            <Table
                size="small"
                loading={isFetching}
                rowKey={record => record.id}
                columns={columns}
                dataSource={vips.length > 0 ? vips : null}
            />
        </div>
    )
}