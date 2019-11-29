/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Table, Badge, Divider, Button, Input, Icon, message } from 'antd'

import { IMembership } from '../../model/IMemebership'
import { ColumnProps } from "antd/lib/table";
import { formatVND } from '../../components/utils'
import { status } from '../../constant'
import { NavLink } from 'react-router-dom'
import { membershipPath } from '../../config/route-config'
import { FirebaseServices } from '../../services/firebase';
import { collections } from '../../constant/FirebaseEnum';
type MembershipProps = {
    memberships: IMembership[]
    loading: boolean
    realtimeUpdateMemberships: any
}

export const MembershipList = ({
    memberships,
    loading,
    realtimeUpdateMemberships,
}: MembershipProps) => {
    useEffect(() => {
        // connect realtime with collection membership
        if (memberships.length === 0) {
            realtimeUpdateMemberships()
        }
    }, [])

    //handle update isDeleted of membership 
    const handleUpdateMembership = (membershipId: string, isDeleted: boolean) => {
        const action = isDeleted ? 'stop membership' : 'active membership'
        const hiden = message.loading(action + '...')
        FirebaseServices.db.collection(collections.memberships).doc(membershipId).update({ updateAt: new Date(), isDeleted })
            .then(_ => {
                message.success(action + 'success', 1)
            })
            .catch(_ => {
                message.error(action + 'success', 1)
            })
            .finally(hiden)
    }

    // start handle search by property 
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
    // end handle search by property 

    // start table config
    const [pagination, setPagination] = useState({ pageSize: 10, current: 1 });
    const onChangePage = (pagination: any) => {
        setPagination(pagination)
    }
    const columns: ColumnProps<IMembership>[] = [
        {
            title: '#',
            align: 'center',
            dataIndex: '#',
            width: 50,
            render: (text, record, index) => index + (pagination.current - 1) * pagination.pageSize
        },
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
                                onClick={() => handleUpdateMembership(record.id, true)}
                            >stop</span>
                            <Divider type="vertical" />
                        </>
                    ) : (
                            <>
                                <span className="action-delete"
                                    onClick={() => handleUpdateMembership(record.id, false)}
                                >active</span>
                                <Divider type="vertical" />
                            </>
                        )
                    }
                    <NavLink
                        activeClassName="action--active"
                        to={{
                            pathname: `${membershipPath}/detail/${record.id}`,
                            state: record
                        }}
                    >view</NavLink>
                </div>
            )
        }
    ]
    // end table config
    return (
        <Table
            size="small"
            pagination={pagination}
            onChange={onChangePage}
            rowKey={record => record.id}
            dataSource={memberships}
            columns={columns}
            loading={memberships.length === 0 || loading === true}
        />
    )
}