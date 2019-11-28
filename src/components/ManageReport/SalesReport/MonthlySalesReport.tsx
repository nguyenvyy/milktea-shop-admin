import React from 'react'
import { IOrder } from '../../../model/IOrder'
import { IProduct } from '../../../model/IProduct'
import { RouteComponentProps } from 'react-router-dom'

type MonthlySalesReportProps = {
    orders: IOrder[],
    products: IProduct[],
    routeProps: RouteComponentProps
}
const MonthlySalesReport = ({
    orders, products, routeProps
}: MonthlySalesReportProps) => {

    return (
        <div>
            MonthlySalesReport
        </div>
    )
}

export default MonthlySalesReport