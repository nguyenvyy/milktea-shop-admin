import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom'

import './Admin.scss'
import { NavBar } from '../../components/NavBar/NavBar';
import { Loading } from '../../components/common/Loading/Loading';
import { RouteWithSubRoutes } from '../../routes/RouteWithSubRoutes';

const Admin = ({ routes = [] }) => {

    const navWidth = {
        maxWidth: {
            minWidth: '200px',
            maxWidth: '200px',
            width: '200px'
        },
        minWidth: {
            minWidth: '50px',
            maxWidth: '50px',
            width: '50px'
        }
    }

    return (
        <div className="d-flex container-full">
            <NavBar {...navWidth} />
            <div className="views">
            <Suspense fallback={<Loading />}>
                <Switch>
                    {routes.map((route, index) => (
                        <RouteWithSubRoutes key={index} {...route} />
                    ))}
                </Switch>
            </Suspense>
            </div>
        </div>
    )
}

export default Admin;