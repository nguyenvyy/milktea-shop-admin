import React from 'react'
import { IOrder } from '../../../model/IOrder'
import { IProduct } from '../../../model/IProduct'
import { RouteComponentProps } from 'react-router-dom'

type DailySalesReportProps = {
    orders: IOrder[],
    products: IProduct[],
    routeProps: RouteComponentProps
}
const DailySalesReport = ({
    orders, products, routeProps
}: DailySalesReportProps) => {

    return (
        <div>
            DailySalesReport
        </div>
    )
}

export default DailySalesReport