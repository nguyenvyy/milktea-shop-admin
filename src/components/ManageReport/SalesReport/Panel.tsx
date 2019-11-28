import React from 'react'
import { NavLink } from 'react-router-dom'
import { salesReportPath } from '../../../config/route-config'

export const Panel = () => (
    <div className="panel d-flex-center">
        <NavLink className="panel__item ant-btn" activeClassName="ant-btn-primary" to={`${salesReportPath}/daily`}>Daily</NavLink>
        <NavLink className="panel__item ant-btn" activeClassName="ant-btn-primary" to={`${salesReportPath}/monthly`}>Monthly</NavLink>
        <NavLink className="panel__item ant-btn" activeClassName="ant-btn-primary" to={`${salesReportPath}/yearly`}>Yearly</NavLink>
    </div>
)