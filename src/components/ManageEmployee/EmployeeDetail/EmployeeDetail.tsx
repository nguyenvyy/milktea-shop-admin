import React from "react";

import "./EmployeeDetail.scss";
import { Header } from "../../common/Header/Header";
import { Descriptions, Spin, Badge } from "antd";
import { formatVND } from "../../utils";
import moment from "moment";
import { formatDate, status } from "../../../constant";
import { IEmployee } from "../../../model/IEmployee";
import { IRole } from "../../../model/constant-types-interface";
export const EmployeeDetail = ({
    employee,
    role,
    isFetching
}: {
    isFetching: boolean,
    employee: IEmployee,
    role: IRole,
}) => {
    return (
        <div className="detail-employee">
            <Header className="detail-employee__title" title="Detail employee" />
            <div className="detail-employee__info">
                <Spin spinning={isFetching} tip="Loading...">
                    {
                        !isFetching && (
                                <Descriptions layout="vertical" size="small" bordered>
                                    <Descriptions.Item label="Name" span={3} >{employee.name}</Descriptions.Item>
                                    <Descriptions.Item label="Email" span={3} >{employee.email}</Descriptions.Item>
                                    <Descriptions.Item label="Point" span={1} >{formatVND(employee.point)} </Descriptions.Item>
                                    <Descriptions.Item label="Orders" span={1} >{formatVND(employee.orderCount)} </Descriptions.Item>
                                    <Descriptions.Item label="Role" span={1} >{role.name}</Descriptions.Item>
                                    <Descriptions.Item label="Birthday" span={3} >{moment(employee.birthday, formatDate).format(formatDate)}</Descriptions.Item>
                                    <Descriptions.Item label="Status" span={3}>
                                        {!employee.isDeleted ?
                                            <Badge status="success" text={status.active} /> :
                                            <Badge status="error" text={status.stop} />
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Create date" span={3} >{moment(employee.createAt, formatDate).format(formatDate)}</Descriptions.Item>
                                    <Descriptions.Item label="Last updae" span={3} >{moment(employee.updateAt, formatDate).format(formatDate)}</Descriptions.Item>
                                </Descriptions>
                        )
                    }
                </Spin>
            </div>
        </div>
    )
}