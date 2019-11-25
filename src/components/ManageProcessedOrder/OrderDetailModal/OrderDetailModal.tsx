/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { RouteComponentProps, Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Tag, Descriptions, Icon, Badge } from 'antd'

import './OrderDetailModal.scss'
import { IOrder } from '../../../model/IOrder'
import { processedOrderPath, membershipPath, employeePath } from '../../../config/route-config'
import { RootState } from '../../../redux/reducers/root-reducer'
import { fetchConstantTypes } from '../../../redux/actions/constant-type/actions'
import { fetchProducts } from '../../../redux/actions/product/actions'
import { Header } from '../../common/Header/Header'
import { formatVND } from '../../utils'
import moment from 'moment'
const { Item } = Descriptions
const LoadingTag = <Tag color="blue"> ...loading</Tag>
export const OrderDetailModal = ({ location: { state }, history }: RouteComponentProps) => {
    const order: IOrder = state
    // handle open close modal
    const [visible, setVisible] = useState(true);
    const close = () => {
        setVisible(false);
        setTimeout(() => {
            history.goBack();
        }, 200);
    };
    const dispatch = useDispatch()
    const constantType = useSelector((state: RootState) => ({ ...state.constantType }))
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


    return state === undefined ? (
        <Redirect to={processedOrderPath} />
    ) : (
            <Modal
                width="80%"
                visible={visible} onCancel={close} onOk={close}
                title={<div>Order ID: <Tag color="green">{order.id}</Tag></div>}>
                <Descriptions
                    layout="vertical"
                    size="small"
                    bordered>
                    <Item label="Price total" >
                        {formatVND(order.priceTotal)}
                    </Item>
                    <Item label={<span>Discount <Icon className="pointer" style={{ color: '#1890ff' }} type="eye" /></span>}>
                        {order.disscount !== undefined ? formatVND(order.disscount.value) : <Tag color="red">Không có</Tag>}
                    </Item>
                    <Item label="Payment method">
                        {paymentMethod}
                    </Item>
                    <Item label="State" span={1}>
                        {orderState !== undefined ? <Badge color={orderState.color} text={orderState.name} /> : LoadingTag}
                    </Item>
                    <Item  label={<span>
                        Membership ID
                            {order.idMembership && <Link to={`${membershipPath}/detail/${order.idMembership}`}>
                            <Icon className="pointer" style={{ color: '#1890ff', marginLeft: '5px' }} type="eye" />
                        </Link>}
                    </span>}>
                        {order.idMembership ? <Tag color="green">{order.idMembership}</Tag> : <Tag color='red'>Không có</Tag>}
                    </Item>
                    <Item label={<span>
                        Employee ID
                            {order.idEmployee && <Link to={`${employeePath}/detail/${order.idEmployee}`}>
                            <Icon className="pointer" style={{ color: '#1890ff', marginLeft: '5px' }} type="eye" />
                        </Link>}
                    </span>}>
                        {order.idEmployee ? <Tag color="green">{order.idEmployee}</Tag> : <Tag color='red'>Không có</Tag>}
                    </Item>
                    <Item label="Create at" >
                        {moment(order.createAt).format('H:mm:ss - DD/MM/YYYY')}
                    </Item>
                    <Item label="Update at" >
                        {moment(order.updateAt).format('H:mm:ss - DD/MM/YYYY')}
                    </Item>
                    <Item label="Paid at"  >
                        {order.paidAt ? moment(order.paidAt).format('H:mm:ss - DD/MM/YYYY') : <Tag color='red'>Chưa thanh toán</Tag>}
                    </Item>
                    <Item label="Receiver name" span={1}>
                        {order.receiverInfo.name}
                    </Item>
                    <Item label="Receiver phone" span={2}>
                        {order.receiverInfo.phoneNumber}
                    </Item>
                    <Item label="Receiver address" span={3}>
                        {order.receiverInfo.address}
                    </Item>
                    <Item label="Require" span={3}>
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
            </Modal>
        )
}