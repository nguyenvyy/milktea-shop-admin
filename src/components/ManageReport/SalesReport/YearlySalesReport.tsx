import React from 'react'
import { IOrder } from '../../../model/IOrder'
import { IProduct } from '../../../model/IProduct'
import { RouteComponentProps } from 'react-router-dom'

type YearlySalesReportProps = {
    orders: IOrder[],
    products: IProduct[],
    routeProps: RouteComponentProps
}

const YearlySalesReport = ({
    orders, products, routeProps
}: YearlySalesReportProps) => {

    return (
        <div>
            YearlySalesReport
        </div>
    )
}

export default YearlySalesReport