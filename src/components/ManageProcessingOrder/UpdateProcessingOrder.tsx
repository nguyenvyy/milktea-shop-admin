/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { RouteComponentProps, Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './ManageProcessingOrder.scss'
import { IOrder } from '../../model/IOrder'
import { processingOrderPath } from '../../config/route-config'
import { Descriptions, Tag, Badge, Icon, Button, message } from 'antd'
import { RootState } from '../../redux/reducers/root-reducer'
import { fetchConstantTypes } from '../../redux/actions/constant-type/actions'
import { formatVND, calculateExtraPoint } from '../utils'
import moment from 'moment'
import { fetchProducts } from '../../redux/actions/product/actions'
import { Header } from '../common/Header/Header'
import { updateProcessingOrderAPI, addOrderToProcessedOrder, deleteProcessingOrderAPI, updatePointForMembership, updateOrderCountForEmployee } from '../../redux/actions/processing-order/service'
import { LoadingFit } from '../common/Loading/Loading'

const { Item } = Descriptions
const LoadingTag = <Tag color="blue"> ...loading</Tag>
export const UpdateProcessingOrder = ({ location: { state, pathname }, history }: RouteComponentProps) => {
    const [order, setOrder] = useState<IOrder | undefined>(undefined)
    useEffect(() => {
        if (state !== undefined) {
            setOrder({ ...state })
            console.log(state)
        }
    }, [state])
    const dispatch = useDispatch()
    const constantType = useSelector((state: RootState) => ({ ...state.constantType }))
    const employee = useSelector((state: RootState) => state.auth.user)
    useEffect(() => {
        //fetch data init for order detail: 
        if (constantType.roles.length === 0 && constantType.isFetching === false) {
            dispatch(fetchConstantTypes())
        }
    }, [])
    const products = useSelector((state: RootState) => ({ ...state.product }))
    useEffect(() => {
        //fetch data init for order detail: 
        if (products.items.length === 0 && products.isFetching === false) {
            dispatch(fetchProducts())
        }
    }, [])
    //get state detail
    const orderState = useMemo(() => {
        let result = undefined
        if (order !== undefined && constantType.orderStates.length > 0) {
            result = constantType.orderStates.find(item => item.id === order.idState)
        }
        return result
    }, [order, constantType.orderStates])

    //get payment method detail 
    const paymentMethod = useMemo(() => {
        if (order !== undefined && constantType.paymentMethods.length > 0) {
            const result = constantType.paymentMethods.find(item => item.id === order.idPaymentMethod)
            if (result !== undefined) {
                return result.name
            }
        }
        return LoadingTag
    }, [order, constantType.paymentMethods])

    // check state is active
    const checkStateActive = (id: string) => {
        if (orderState !== undefined) {
            if (orderState.id === id) {
                return true
            }
        }
        return false
    }
    const [loadingChangeProcessingOrder, setLoadingChangeProcessingOrder] = useState(false)

    // handle change processing order state
    const handleChangeProcessingState = (idState: string) => {

        if (order !== undefined) {
            setLoadingChangeProcessingOrder(true)
            const updated = { idState, updateAt: new Date() }
            updateProcessingOrderAPI(order.id, { ...updated })
                .then(_ => {
                    setOrder({ ...order, ...updated })
                    setLoadingChangeProcessingOrder(false)
                })
                .catch(_ => {
                    message.error('action failed')
                })
        }

    }
    const [loadingChangeProcessedOrder, setLoadingChangeProcessedOrder] = useState(false)
    // handle change processed order state
    const handleChangeProcessedState = (idState: string) => {
        if (order !== undefined && employee !== null) {
            setLoadingChangeProcessedOrder(true)
            const newOrder = { ...order }
            newOrder.updateAt = new Date()
            newOrder.idEmployee = employee.id
            if (newOrder.paidAt === undefined) {
                newOrder.paidAt = new Date()
            }
            Promise.all([
                addOrderToProcessedOrder(newOrder),
                deleteProcessingOrderAPI(newOrder.id)
            ])
                .then(_ => {
                    setLoadingChangeProcessedOrder(false)
                    history.goBack()
                    updateOrderCountForEmployee(employee.id)
                    if (newOrder.idMembership !== undefined) {
                        updatePointForMembership(newOrder.idMembership, calculateExtraPoint(newOrder.priceTotal))
                    }
                })
                .catch(_ => {
                    message.error('action failed')
                })
        }
    }
    return state === undefined ? (
        <Redirect to={processingOrderPath} />
    ) : (
            order === undefined ? (
                <LoadingFit />
            ) : (
                    <div className="order-description">
                        <Header title="Update order" className="order-description__title" />
                        <div className='scoller'>
                            <Descriptions
                                layout="vertical"
                                size="small"
                                bordered title={<div>ID: <Tag color="green">{order.id}</Tag></div>}>
                                <Item label="Price total" >
                                    {formatVND(order.priceTotal)}
                                </Item>
                                <Item label={<span>Discount <Icon className="pointer" style={{ color: '#1890ff' }} type="eye" /></span>}>
                                    {order.disscount !== undefined ? formatVND(order.disscount.value) : <Tag color="red">Không có</Tag>}
                                </Item>
                                <Item label="Payment method">
                                    {paymentMethod}
                                </Item>
                                <Item label="State">
                                    {orderState !== undefined ? <Badge color={orderState.color} text={orderState.name} /> : LoadingTag}
                                </Item>
                                <Item label="Receiver name">
                                    {order.receiverInfo.name}
                                </Item>
                                <Item label="Receiver address">
                                    {order.receiverInfo.address}
                                </Item>
                                <Item label="Receiver phone">
                                    {order.receiverInfo.phoneNumber}
                                </Item>
                                <Item label="Create at">
                                    {moment(order.createAt).format('H:mm:ss - DD/MM/YYYY')}
                                </Item>
                                <Item label="Update at">
                                    {moment(order.updateAt).format('H:mm:ss - DD/MM/YYYY')}
                                </Item>
                                <Item label="Paid at">
                                    {order.paidAt ? moment(order.paidAt).format('H:mm:ss - DD/MM/YYYY') : <Tag color='red'>Chưa thanh toán</Tag>}
                                </Item>
                                <Item label={<span>
                                    Membership ID
                            {order.idMembership && <Link to={`${processingOrderPath}/membership/${order.idMembership}`}>
                                        <Icon className="pointer" style={{ color: '#1890ff', marginLeft: '5px' }} type="eye" />
                                    </Link>}
                                </span>}>
                                    {order.idMembership ? <Tag color="green">{order.idMembership}</Tag> : <Tag color='red'>Không có</Tag>}
                                </Item>
                                <Item label="Require">
                                    {order.require ? order.require : <Tag color='red'>Không có</Tag>}
                                </Item>
                                <Item label="Products" span={3}>
                                    <ul>
                                        {order.detail.map(item => {
                                            const product = products.items.find(product => product.id === item.id)
                                            let productName: any = LoadingTag
                                            if (product !== undefined) {
                                                productName = product.name
                                            }

                                            return <li key={item.id}>{productName} x {item.count}: {formatVND(item.count * item.price)}</li>
                                        })}
                                    </ul>
                                </Item>
                            </Descriptions>
                        </div>
                        <div className="panel d-flex-center">
                            <div className="panel__processing">
                                <Button
                                    loading={loadingChangeProcessingOrder}
                                    onClick={() => handleChangeProcessingState('nyYJuieg3BHQDjs76PU2')}
                                    disabled={checkStateActive('nyYJuieg3BHQDjs76PU2')}
                                    className={checkStateActive('nyYJuieg3BHQDjs76PU2') ? 'active' : ''}>
                                    Đang chế biến</Button>
                                <Button
                                    loading={loadingChangeProcessingOrder}

                                    onClick={() => handleChangeProcessingState('CxZMmzGihW51HpJhlD0z')}
                                    disabled={checkStateActive('CxZMmzGihW51HpJhlD0z')}
                                    className={checkStateActive('CxZMmzGihW51HpJhlD0z') ? 'active' : ''}>
                                    Đang giao</Button>
                            </div>
                            <div className="panel__processed">
                                <Button
                                    loading={loadingChangeProcessedOrder}
                                    onClick={() => handleChangeProcessedState('pqVXUj9onmC07620vaZD')}
                                >Hủy đơn</Button>
                                <Button
                                    loading={loadingChangeProcessedOrder}
                                    onClick={() => handleChangeProcessedState('eoMaQTw9eQUykUJ78ifR')}
                                >Xác nhận thành công</Button>
                            </div>
                        </div>
                    </div>
                )
        )
}