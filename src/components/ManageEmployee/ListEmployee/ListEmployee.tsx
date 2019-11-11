import React from "react";

import "./ListEmployee.scss";
import { Table, Badge, Divider, message } from "antd";
import { IEmployee } from "../../../model/IEmployee";
import { ColumnProps } from "antd/lib/table";
import { NavLink } from "react-router-dom";
import { employeePath } from "../../../config/route-config";

import { undefinedError, success, status } from "../../../constant";
import { IRole } from "../../../model/constant-types-interface";
export const ListEmployee = ({
    employees = [],
    roles,
    isFetching,
    requestDeleteEmployee,
    requestEditEmployee
}: any) => {

    const handleActiveEmployee = (employee: IEmployee) => {
        const newEmployee: IEmployee = {
            ...employee,
            isDeleted: false,
        }
        requestEditEmployee(newEmployee).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("Active fail", 1)
                    break;
                case success:
                    message.success(`${employee.name} actived`, 1)
                    break;
                default:
                    break;
            }
        })
    }
    const handleDeleteEmployee = (employee: IEmployee) => {
        requestDeleteEmployee(employee.id).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("Delete fail", 1)
                    break;
                case success:
                    message.success(`${employee.name} deleted`, 1)
                    break;
                default:
                    break;
            }
        })
    }
    const columns: ColumnProps<IEmployee>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
            sorter: (a: IEmployee, b: IEmployee) => a.point - b.point
        },
        {
            title: 'Order Count',
            dataIndex: 'orderCount',
            key: 'orderCount',
            sorter: (a: IEmployee, b: IEmployee) => a.orderCount - b.orderCount
        },
        {
            title: 'Role',
            dataIndex: 'idRole',
            key: 'role',
            render: (id: string) => {
                const role: IRole = roles.find((item: IRole) => item.id === id)
                return role ? role.name : 'loading...'
            },
            filters: roles.map((item: IRole) => ({ text: item.name, value: item.id })),
            onFilter: (value, record) => value === record.idRole,
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: IEmployee) => {

                return (
                    <div className="action">
                        {!record.isDeleted ? (
                            <>
                                <span className="action-delete"
                                    onClick={() => handleDeleteEmployee(record)}
                                >stop</span>
                                <Divider type="vertical" />
                                <NavLink
                                    activeClassName="action--active"
                                    to={`${employeePath}/edit/${record.id}`}>edit</NavLink>
                                <Divider type="vertical" />
                            </>
                        ) : (
                                <>
                                    <span className="action-delete"
                                        onClick={() => handleActiveEmployee(record)}
                                    >active</span>
                                    <Divider type="vertical" />
                                </>
                            )
                        }
                        <NavLink
                            activeClassName="action--active"
                            to={`${employeePath}/detail/${record.id}`}>view</NavLink>
                    </div>
                )
            }
        }
    ];
    return (
        <div className="list-employee">
            <Table
                loading={isFetching}
                rowKey={record => record.id}
                columns={columns}
                dataSource={employees.length > 0 ? employees : null}
            />
        </div>
    )
}