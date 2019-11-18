import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/root-reducer';

export const PrivateRoute = ({component: Component, routes, ...rest}: any) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    return (
        <Route 
            {...rest}
            render={routeProps => isLoggedIn ? (
                <Component  {...routeProps} routes={routes} />
            ): (
                <Redirect  
                    to={{
                        pathname: '/login',
                        state: {from : routeProps.location}
                    }}
                />
            )}
        />
    )
}