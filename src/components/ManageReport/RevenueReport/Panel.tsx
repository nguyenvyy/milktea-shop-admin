import React from 'react'
import { NavLink } from 'react-router-dom'
import { revenueReportPath } from '../../../config/route-config'

export const Panel = () => (
    <div className="panel d-flex-center">
        <NavLink className="panel__item ant-btn" activeClassName="ant-btn-primary" to={`${revenueReportPath}/daily`}>Daily</NavLink>
        <NavLink className="panel__item ant-btn" activeClassName="ant-btn-primary" to={`${revenueReportPath}/monthly`}>Monthly</NavLink>
        <NavLink className="panel__item ant-btn" activeClassName="ant-btn-primary" to={`${revenueReportPath}/yearly`}>Yeary</NavLink>
    </div>
)