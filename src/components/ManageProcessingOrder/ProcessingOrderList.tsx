/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IOrder } from '../../model/IOrder'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/root-reducer'
import { realtimeUpdateProcessingOrders } from '../../redux/actions/processing-order/actions'
import { Input, Button, Icon, Tag, Badge } from 'antd'
import { NavLink, Route } from 'react-router-dom'
import Table, { ColumnProps } from 'antd/lib/table'
import { fetchConstantTypes } from '../../redux/actions/constant-type/actions'
import { IOrderState } from '../../model/constant-types-interface'
import { formatVND } from '../utils'
import { ProductListtInOrder } from './ProductListtInOrder'
import { processingOrderPath } from '../../config/route-config'
import { MembershipDetailModal } from '../ManageMembership/MembershipDetailModal'
import moment from 'moment'


export const ProcessingOrderList = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state: RootState) => state.processingOrder.items)
    //connect realtime with processing orders: 
    useEffect(() => {
        if (orders.length === 0) {
            dispatch(realtimeUpdateProcessingOrders())
        }
    }, [orders.length, realtimeUpdateProcessingOrders])

    const constantType = useSelector((state: RootState) => ({ ...state.constantType }))
    //fetch data init for order detail: 
    useEffect(() => {
        if (constantType.roles.length === 0 && constantType.isFetching === false) {
            dispatch(fetchConstantTypes())
        }
    }, [])
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

    // table config
    const [pagination, setPagination] = useState({ pageSize: 13, current: 1 });
    const onChangePage = (pagination: any) => {
        setPagination(pagination)
    }

    const columns: ColumnProps<IOrder>[] = [
        {
            title: '#',
            align: 'center',
            dataIndex: '#',
            width: 50,
            render: (text, record, index) => index + (pagination.current - 1) * pagination.pageSize
        },
        {
            title: 'ID',
            align: 'center',
            dataIndex: 'id',
            width: 180,
            render: id => <Tag color="green">{id}</Tag>,
            ...getColumnSearchProps('id')
        },
        {
            title: 'State',
            dataIndex: 'idState',
            align: 'center',
            render: (text) => {
                if (constantType.isFetching === true) {
                    return <Tag color="blue"> ...loading</Tag>
                }
                const state: IOrderState | undefined = constantType.orderStates.find(item => item.id === text)
                if (state !== undefined) {
                    return <Badge color={state.color} text={state.name} />
                }
                return <Tag color="red">Không xác định</Tag>
            },
            sorter: (a: IOrder, b: IOrder) => a.idState.charCodeAt(1) - b.idState.charCodeAt(1)
        },
        {
            title: 'Price total',
            align: 'center',
            dataIndex: 'priceTotal',
            render: priceTotal => formatVND(priceTotal)
        },
        {
            title: 'Payment',
            align: 'center',
            dataIndex: 'idPaymentMethod',
            render: idPaymentMethod => {
                if (constantType.paymentMethods.length > 0) {
                    const result = constantType.paymentMethods.find(item => item.id === idPaymentMethod)
                    if (result !== undefined) {
                        return result.name
                    }
                }
                return <Tag color="blue"> ...loading</Tag>
            }
        },
        {
            title: 'Create at',
            align: 'center',
            dataIndex: 'createAt',
            width: 180,
            render: createAt => moment(createAt).format('H:m - DD/MM')
        },
        {
            title: 'Action',
            render: (record: IOrder) => (
                    <NavLink
                    activeStyle={{
                        color: '#52c41a'
                    }}
                        to={{
                            pathname: `${processingOrderPath}/detail/${record.id}`,
                            state: record
                        }}
                    >view</NavLink>
            )
        }
    ]
    return (
        <div>
            <Table
                expandedRowRender={ProductListtInOrder}
                pagination={pagination}
                onChange={onChangePage}
                size="small"
                rowKey={record => record.id}
                columns={columns}
                dataSource={orders !== null ? orders : undefined}
                
            />
            <Route path={`${processingOrderPath}/membership/:id`} exact component={MembershipDetailModal} />
        </div>
    )
}