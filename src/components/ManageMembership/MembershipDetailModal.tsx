/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { Modal, Descriptions, Badge, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux'

import './MembershipDetailModal.scss'
import { IMembership } from '../../model/IMemebership';
import { employeePath } from '../../config/route-config';
import { formatDate, status } from '../../constant';
import { RootState } from '../../redux/reducers/root-reducer';
import { fetchConstantTypes } from '../../redux/actions/constant-type/actions';
import { fetchVIPs } from '../../redux/actions/vip/actions';
import { IOrder } from '../../model/IOrder';
import { FirebaseServices } from '../../services/firebase';
import { collections, order_docs, sub_collections } from '../../constant/FirebaseEnum';
import { LoadingAdvance, LoadingFit } from '../common/Loading/Loading';
import { ColumnProps } from 'antd/lib/table';
import { formatVND } from '../utils';
import { IOrderState, IPaymentMethod } from '../../model/constant-types-interface';
import { ProductListtInOrder } from '../ManageProcessingOrder/ProductListtInOrder';
const { Item } = Descriptions;

export const MembershipDetailModal = ({ location: { state }, history, match }: RouteComponentProps) => {
    const dispatch = useDispatch()
    const store = useSelector((state: RootState) => (
        {
            ...state.constantType,
            isFetchingType: state.constantType.isFetching,
            vips: state.vip.items,
            isFetchVip: state.vip.isFetching
        })
    )
    useEffect(() => {
        //fetch data init for order detail: 
        if (store.roles.length === 0 && store.isFetchingType === false) {
            dispatch(fetchConstantTypes())
        }
        //fetch data init for vip of membership: 
        if (store.vips.length === 0 && store.isFetchVip === false) {
            dispatch(fetchVIPs())
        }
        //
    }, [])

    // handle fetch membership when state = undefind
    const [membership, setMembership] = useState<IMembership | undefined>(undefined)
    useEffect(() => {
        if (state !== undefined) {
            setMembership(state)
        } else {
            const params: any = match.params
            FirebaseServices.db.collection(collections.memberships).doc(params.id).get()
                .then(doc => {
                    const data: any = doc.data();
                    const newMembership: IMembership = {
                        ...data,
                        birthday: data.birthday.toDate(),
                        createAt: data.createAt.toDate(),
                        updateAt: data.updateAt.toDate(),
                    }
                    setMembership(newMembership)
                })
        }
    }, [])

    const [orders, setOrders] = useState<IOrder[] | null>(null)
    // fetch orders list of membership
    useEffect(() => {
        if (membership !== undefined) {
            const processingCol = FirebaseServices.db.collection(collections.orders).doc(order_docs.processing).collection(sub_collections.types).where('idMembership', '==', membership.id)
            const processedCol = FirebaseServices.db.collection(collections.orders).doc(order_docs.processed).collection(sub_collections.types).where('idMembership', '==', membership.id)
            Promise.all([processingCol.get(), processedCol.get()]).then(cols => {
                let newOrders: IOrder[] = []
                cols.forEach(col => {
                    if (col.docs.length > 0) {
                        const list = col.docs.map(doc => {
                            let order: IOrder
                            const data: any = doc.data()
                            order = {
                                ...data,
                                createAt: data.createAt.toDate(),
                                updateAt: data.updateAt.toDate()
                            }
                            if (data.paidAt !== undefined) {
                                order.paidAt = data.paidAt.toDate()
                            }
                            return order
                        })
                        newOrders = [...newOrders, ...list]
                    }
                })
                newOrders.sort((a, b) => b.createAt.getTime() - a.createAt.getTime())
                setOrders(newOrders)
            })

        }
    }, [membership])
    // handle open/close modal effect
    const [visible, setVisible] = useState(true);
    const close = () => {
        setVisible(false);
        setTimeout(() => {
            history.goBack();
        }, 200);
    };

    // config table
    const [pagination, setPagination] = useState({ pageSize: 10, current: 1 });
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
            render: id => <Tag color="green">{id}</Tag>
        },

        {
            title: 'State',
            dataIndex: 'idState',
            align: 'center',
            render: (text) => {
                if (store.isFetchingType === true) {
                    return '...loading'
                }
                const state: IOrderState | undefined = store.orderStates.find(item => item.id === text)
                if (state !== undefined) {
                    return <Badge color={state.color} text={state.name} />
                }
                return 'undefined'
            },
            sorter: (a: IOrder, b: IOrder) => a.idState.charCodeAt(1) - b.idState.charCodeAt(1)
        },
        {
            title: 'Create at',
            align: 'center',
            dataIndex: 'createAt',
            render: createAt => moment(createAt).format(formatDate)
        },
        {
            title: 'Paid at',
            align: 'center',
            dataIndex: 'paidAt',
            render: paidAt => paidAt !== undefined ? moment(paidAt).format(formatDate) : <Tag color="red">Chưa thanh toán</Tag>
        },
        {
            title: 'Payment Method',
            align: 'center',
            dataIndex: 'idPaymentMethod',
            render: (text) => {
                if (store.isFetchingType === true) {
                    return '...loading'
                }
                const state: IPaymentMethod | undefined = store.paymentMethods.find(item => item.id === text)
                if (state !== undefined) {
                    return state.name
                }
                return 'undefined'
            },
        },
        {
            title: 'Price total',
            align: 'center',
            dataIndex: 'priceTotal',
            render: priceTotal => formatVND(priceTotal)
        },
        {
            title: 'EmployeeId',
            align: 'center',
            width: 240,
            dataIndex: 'idEmployee',
            render: idEmployee => idEmployee !== undefined ?
                <Tag style={{ cursor: 'pointer' }} onClick={() => goEmployee(idEmployee)} className="pointer" color="green"> {idEmployee} </Tag> :
                <Tag color="red"> Chưa có nhân viên xử lý</Tag>
        },
        {
            title: 'Disscount',
            align: 'center',
            dataIndex: 'disscount',
            render: disscount => disscount !== undefined ? formatVND(disscount) : <Tag color="red">Không có</Tag>
        },

    ]

    // get vip detail by id
    const vip = useMemo(() => {
        if (membership !== undefined && store.vips.length !== 0) {
            const vipIncre = store.vips.sort((a, b) => b.point - a.point)
            const result = vipIncre.find(vip => vip.point <= membership.point)
            if (result !== undefined) {
                return <Tag color="green">{result.name}</Tag>
            } else {
                return <Tag color="red">Chưa có vip</Tag>
            }
        } else {
            return <Tag color="blue"> ...loading</Tag>
        }

    }, [membership, store.vips])

    // go employee detail
    const goEmployee = (employeeId: string) => {
        history.push(`${employeePath}/detail/${employeeId}`)

    }

    return <Modal width="98%" title={'Membership Detail'} visible={visible} onCancel={close} onOk={close}>
        {membership !== undefined ? (
            <Descriptions bordered title={membership.name}>
                <Item label="Email">{membership.email}</Item>
                <Item label="Phone">{membership.phoneNumber}</Item>
                <Item label="Birthday">{moment(membership.birthday).format(formatDate)}</Item>
                <Item label="Point - Vip">{membership.point} - {vip}</Item>
                <Item label="Cancels">{membership.numberOfCancels}</Item>
                <Item label="Returns">{membership.numberOfReturns}</Item>
                <Item label="Address" span={3}>
                    {membership.address}
                </Item>
                <Item label="Status">
                    {!membership.isDeleted ? (
                        <Badge status="success" text={status.active} />
                    ) : (
                            <Badge status="error" text={status.stop} />
                        )}
                </Item>
                <Item label="Register at">{moment(membership.createAt).format(formatDate)}</Item>
                <Item label="Update at">{moment(membership.updateAt).format(formatDate)}</Item>
                <Item label="Orders" >
                    <LoadingAdvance loading={orders === null ? true : false}>
                        <Table
                            expandedRowRender={ProductListtInOrder}
                            pagination={pagination}
                            onChange={onChangePage}
                            size="small"
                            rowKey={record => record.id}
                            columns={columns}
                            dataSource={orders !== null ? orders : undefined}
                        />
                    </LoadingAdvance>
                </Item>
            </Descriptions>
        ) : <LoadingFit />}
    </Modal>
};
