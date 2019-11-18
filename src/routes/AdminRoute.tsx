import React, { useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/root-reducer';
import { IEmployee } from '../model/IEmployee';
import { adminPermission } from '../constant';
import { message } from 'antd';

export const AdminRoute = ({ component: Component, routes, ...rest }: any) => {

    const user: IEmployee | null = useSelector((state: RootState) => state.auth.user)
    const canAccess = useMemo(() => {
        if (user !== null) {
            if (user.idRole === adminPermission) {
                return true
            }
        }

        return false
    }, [user])
    return (
        <Route
            {...rest}
            render={routeProps => {
                if (canAccess)
                    return <Component  {...routeProps} routes={routes} />
                else {
                    message.error(`you are not authorized to access this page`, 1)
                    return <Redirect to="/a" />
                }
            }}
        />
    )
}