import React from 'react'
import { Route } from 'react-router-dom'

import './ProcessedOrder.scss'
import { Header } from '../../components/common/Header/Header'
import { ProcessedOrderList } from '../../components/ManageProcessedOrder/ProcessedOrderList/ProcessedOrderList'
import { OrderDetailModal } from '../../components/ManageProcessedOrder/OrderDetailModal/OrderDetailModal'
import { processedOrderPath } from '../../config/route-config'
const ProcessedOrder = () => {
    return (
        <div className="processed-order">
            <Header title="Processed Order" />
            <div className="processed-order__list">
                <ProcessedOrderList />
            </div>
            <Route path={`${processedOrderPath}/detail/:id`} exact component={OrderDetailModal} />
        </div>
    )
}

export default ProcessedOrder