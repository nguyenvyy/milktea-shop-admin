import React from 'react'
import { IOrder, IOrderDetail } from '../../model/IOrder'
import { formatVND } from '../utils'
import { Tag } from 'antd'

export const ProducListtInOrder = (order: IOrder) => (
    <div className="d-flex-center">
        <ul>
            {order.detail.map((value: IOrderDetail, index) => <li key={index}>  FoodId: <Tag color="green"> {value.id} </Tag>{` - ${formatVND(value.price)} x ${value.count}`}</li>)}
        </ul>
    </div>
)