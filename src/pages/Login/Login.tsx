import React from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './Login.scss'
import { RootState } from '../../redux/reducers/root-reducer';
import { LoginForm } from '../../components/ManageLogin/LoginForm';

const Login = ({location}: any) => {
    const {isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth)
    const { from } = location.state || { from : { pathname: '/' }}
    return (
        <div className="login d-flex-center">
            <div className="login__form">
                {isLoggedIn ? (
                    <Redirect to={from} />
                ) : (
                    <LoginForm isLoading={isLoading} />
                )}
            </div>
        </div>
    )
}

export default Login