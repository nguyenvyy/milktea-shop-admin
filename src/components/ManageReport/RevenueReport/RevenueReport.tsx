/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './RevenueReport.scss'
import { Header } from '../../common/Header/Header'
import { RootState } from '../../../redux/reducers/root-reducer'
import { realtimeUpdateProcessedOrders } from '../../../redux/actions/processed-order/actions'
import { Panel } from './Panel'
import { revenueReportPath } from '../../../config/route-config'
import { Loading } from '../../common/Loading/Loading'

const DailyRevenueReport = lazy(() => import('./DailyRevenueReport'))
const MonthlyRevenueReport = lazy(() => import('./MonthlyRevenueReport'))
const YearlyRevenueReport = lazy(() => import('./YearlyRevenueReport'))

const RevenueReport = () => {
    const dispatch = useDispatch()
    const orders = useSelector((state: RootState) => state.processedOrder.items)
    useEffect(() => {
        if (orders.length === 0) {
            dispatch(realtimeUpdateProcessedOrders())
        }
    }, [])
    return (
        <div className="revenue-report">
            <Header title="Revenue Report" />
            <Panel />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path={`${revenueReportPath}`} exact render={_ => <Redirect to={`${revenueReportPath}/daily`} />} />
                    <Route path={`${revenueReportPath}/daily`} render={_ => <DailyRevenueReport orders={orders} />} />
                    <Route path={`${revenueReportPath}/monthly`} render={_ => <MonthlyRevenueReport orders={orders} />} />
                    <Route path={`${revenueReportPath}/yearly`} render={_ => <YearlyRevenueReport orders={orders} />} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default RevenueReport
