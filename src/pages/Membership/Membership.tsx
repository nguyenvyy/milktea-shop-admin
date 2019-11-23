import React, { useEffect, useState } from 'react'
import { IMembership } from '../../model/IMemebership'

import './Membership.scss'
import { Header } from '../../components/common/Header/Header'
import { Table, Badge, Divider, Button, Input, Icon } from 'antd'
import { ColumnProps } from "antd/lib/table";
import { formatVND } from '../../components/utils'
import { status } from '../../constant'
import { NavLink } from 'react-router-dom'
import { membershipPath } from '../../config/route-config'

type MembershipProps = {
    memberships: IMembership[],
    loading: boolean,
    realtimeUpdateMemberships: any
}

export const Membership = ({
    memberships,
    loading,
    realtimeUpdateMemberships
}: MembershipProps) => {
    useEffect(() => {
        if (memberships.length === 0) {
            realtimeUpdateMemberships()
        }
    }, [memberships.length, realtimeUpdateMemberships])

    const [search, setSearch] = useState({});
    const handleSearch = (selectedKeys: string[], confirm: any) => {
        confirm();
        setSearch({ searchText: selectedKeys[0] });
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearch({ searchText: '' });
    };
    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node: any) => {
                        setSearch(node);
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: string, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
            let c: any = search
            if (visible) {
                setTimeout(() => c.select());
            }
        }
    });

    const columns: ColumnProps<IMembership>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber')

        },
        {
            title: 'Point',
            dataIndex: 'point',
            render: (point: number) => formatVND(point),
            sorter: (a: IMembership, b: IMembership) => a.point - b.point
        },
        {
            title: 'Cancels',
            dataIndex: 'numberOfCancels',
            sorter: (a: IMembership, b: IMembership) => a.numberOfCancels - b.numberOfCancels
        },
        {
            title: 'Returns',
            dataIndex: 'numberOfReturns',
            sorter: (a: IMembership, b: IMembership) => a.numberOfReturns - b.numberOfReturns
        },
        {
            title: 'Orders',
            dataIndex: 'orders',
            render: (orders: string[]) => orders.length,
            sorter: (a: IMembership, b: IMembership) => a.orders.length - b.orders.length
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            render: isDeleted => (
                <>
                    {!isDeleted ?
                        <Badge status="success" text={status.active} /> :
                        <Badge status="error" text={status.stop} />
                    }
                </>
            ),
            filters: [
                { text: status.active, value: 'false' },
                { text: status.stop, value: 'true' },
            ],
            onFilter: (value, record) => record.isDeleted.toString() === value,
        },
        {
            title: 'Action',
            render: (record: IMembership) => (
                <div className="action">
                    {!record.isDeleted ? (
                        <>
                            <span className="action-delete"
                                onClick={() => 1}
                            >stop</span>
                            <Divider type="vertical" />
                        </>
                    ) : (
                            <>
                                <span className="action-delete"
                                    onClick={() => 1}
                                >active</span>
                                <Divider type="vertical" />
                            </>
                        )
                    }
                    <NavLink
                        activeClassName="action--active"
                        to={`${membershipPath}/detail/${record.id}`}>view</NavLink>
                </div>
            )
        }
    ]
    return (
        <div className="membership">
            <Header title="Membership" />
            <div className="membership__list">
                <Table
                    pagination={{ pageSize: 9 }}
                    rowKey={record => record.id}
                    dataSource={memberships}
                    columns={columns}
                    loading={memberships.length === 0 || loading === true}
                />
            </div>
        </div>
    )
}