/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './SalesReport.scss'
import { Header } from '../../common/Header/Header'
import { RootState } from '../../../redux/reducers/root-reducer'
import { realtimeUpdateProcessedOrders } from '../../../redux/actions/processed-order/actions'
import { Panel } from './Panel'
import { salesReportPath } from '../../../config/route-config'
import { Loading } from '../../common/Loading/Loading'
import { fetchProducts } from '../../../redux/actions/product/actions'

const DailySalesReport = lazy(() => import('./DailySalesReport'))
const MonthlySalesReport = lazy(() => import('./MonthlySalesReport'))
const YearlySalesReport = lazy(() => import('./YearlySalesReport'))

const SalesReport = () => {
    const dispatch = useDispatch()
    const orders = useSelector((state: RootState) => state.processedOrder.items)
    const products = useSelector((state: RootState) => state.product.items)
    useEffect(() => {
        // if (orders.length === 0) {
        //     dispatch(realtimeUpdateProcessedOrders())
        // }
        // if (products.length === 0) {
        //     dispatch(fetchProducts())
        // }
    }, [])
    return (
        <div className="sales-report">
            <Header title="Sales Report" />
            <Panel />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path={`${salesReportPath}`} exact render={_ => <Redirect to={`${salesReportPath}/daily`} />} />
                    <Route path={`${salesReportPath}/daily`} render={props => <DailySalesReport routeProps={props} orders={orders} products={products} />} />
                    <Route path={`${salesReportPath}/monthly`} render={props => <MonthlySalesReport routeProps={props} orders={orders} products={products} />} />
                    <Route path={`${salesReportPath}/yearly`} render={props => <YearlySalesReport routeProps={props} orders={orders} products={products} />} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default SalesReport
