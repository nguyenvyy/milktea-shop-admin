import React from 'react'
import { Route } from 'react-router-dom'

import './ProcessingOrder.scss'
import { Header } from '../../components/common/Header/Header'
import { ProcessingOrderList } from '../../components/ManageProcessingOrder/ProcessingOrderList'
import { UpdateProcessingOrder } from '../../components/ManageProcessingOrder/UpdateProcessingOrder'
import { processingOrderPath } from '../../config/route-config'

const ProcessingOrder = () => {
    return (
        <div className="processing-order">
            <Header title="Processing Orders" />
            <div className="processing-order__wrapper" >
                <div className="processing-order__wrapper-left">
                    <ProcessingOrderList />
                </div>
                <div className="processing-order__wrapper-right">
                    <Route path={`${processingOrderPath}/detail/:id`} exact component={UpdateProcessingOrder} />
                </div>
            </div>
        </div>
    )
}

export default ProcessingOrder