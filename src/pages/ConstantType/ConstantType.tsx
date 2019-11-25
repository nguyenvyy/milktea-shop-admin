import React, { useEffect } from "react";
import './ConstantType.scss'
import { Header } from "../../components/common/Header/Header";
import Table, { ColumnProps } from "antd/lib/table";
import { IRole, IPaymentMethod, IOrderState } from "../../model/constant-types-interface";
import { Badge, Icon, Tag } from "antd";
const ConstantType = ({
    isFetching,
    roles,
    paymentMethods,
    orderStates,
    fetchConstantTypes
}: any) => {
    useEffect(() => {
        if (roles.length === 0) {
            fetchConstantTypes()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const columnsRole: ColumnProps<IRole>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            align: "center"
        }
    ];

    const columnspaymentMethod: ColumnProps<IPaymentMethod>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
    ];
    const columnsorderStates: ColumnProps<IOrderState>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: id => <Tag color="green">{id}</Tag>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: "center",
            render: (name: string, record: IOrderState) => <Badge color={record.color} text={name} />
        },
        {
            title: 'Can Feedback',
            dataIndex: 'canFeedback',
            key: 'canFeedback',
            render: (value: boolean) => value ? <Icon style={{color: '#64dd17'}} type="check" /> : <Icon style={{color: 'red'}}  type="close" /> ,
            align: "center"
        },
        {
            title: 'Can Cancel',
            dataIndex: 'canCancel',
            key: 'canCancel',
            render: (value: boolean) => value ? <Icon style={{color: '#64dd17'}} type="check" /> : <Icon style={{color: 'red'}}  type="close" /> ,
            align: "center"
        },
        {
            title: 'Can Return',
            dataIndex: 'canReturn',
            key: 'canReturn',
            render: (value: boolean) => value ? <Icon style={{color: '#64dd17'}} type="check" /> : <Icon style={{color: 'red'}}  type="close" /> ,
            align: "center"
        }
    ];

    return (
        <div className="constant-type">
            <div className="item">
                <Header title="Roles" className="item__title" />
                <div className="list">
                    <Table
                        bordered
                        pagination={false}
                        size="small"
                        loading={isFetching}
                        rowKey={record => record.id}
                        columns={columnsRole}
                        dataSource={roles.length > 0 ? roles : null}
                    />
                </div>
            </div>
            <div className="item">
                <Header title="PaymentMethods" className="item__title" />
                <div className="list">
                    <Table
                        bordered
                        pagination={false}
                        size="small"
                        loading={isFetching}
                        rowKey={record => record.id}
                        columns={columnspaymentMethod}
                        dataSource={paymentMethods.length > 0 ? paymentMethods : null}
                    />
                </div>
            </div>
            <div className="item">
                <Header title="Order Status" className="item__title" />
                <div className="list">
                    <Table
                        bordered
                        pagination={false}
                        size="small"
                        loading={isFetching}
                        rowKey={record => record.id}
                        columns={columnsorderStates}
                        dataSource={orderStates.length > 0 ? orderStates : null}
                    />
                </div>
            </div>
        </div>
    )
}

export default ConstantType