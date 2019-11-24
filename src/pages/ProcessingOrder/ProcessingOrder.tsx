import React from 'react'

import './ProcessingOrder.scss'
import { Header } from '../../components/common/Header/Header'
import { ProcessingOrderList } from '../../components/ManageProcessingOrder/ProcessingOrderList'

const ProcessingOrder = () => {
    return (
        <div className="processing-order">
            <Header title="Processing Orders" />
            <div className="processing-order__wrapper" >
                <div className="processing-order__wrapper-left">
                    <ProcessingOrderList />
                </div>
                <div className="processing-order__wrapper-right">
                </div>
            </div>
        </div>
    )
}

export default ProcessingOrder