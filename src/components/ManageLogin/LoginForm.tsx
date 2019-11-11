import React from 'react'

import './LoginForm.scss'
import { Button, message, Input, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux/actions/auth/actions';
import { Link } from 'react-router-dom';

export const LoginForm = ({ isLoading }: any) => {
    const dispatch: any = useDispatch();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const onChange = ({ target: { name, value } }: any) => {
        setUser({
            ...user,
            [name]: value
        })
    }
    useEffect(() => {
        const user = localStorage.getItem('user-olamilktea')
        if (user !== null) {
            setUser(JSON.parse(user))
        }
    }, [])
    const [isRemember, setIsRemember] = useState(false)
    const onChangeRemember = () => {
        setIsRemember(!isRemember)
    }

    const handleLogin = () => {
        dispatch(authenticateUser(user.email, user.password)).then((res: any) => {
            switch (res.status) {
                case 200:
                    message.success('Login success')
                    if (isRemember) {
                        localStorage.setItem('user-olamilktea', JSON.stringify(user))
                    }
                    break;
                default:
                    message.error('Login fail')
                    break;
            }
        })
    }

    const onEnter = (e: any) => {
        if (e.keyCode === 13) {
            handleLogin()
        }
    }

    return (
        <div className="login-form d-flex-col" >
            <label className="login-form-title" htmlFor="username">Olamilktea(Admin)</label>
            <div className="wrap-input">
                <Input className="input" name="email" placeholder="Email"
                    value={user.email}
                    onChange={onChange}
                    onKeyUp={onEnter}
                />
            </div>
            <div className="wrap-input">
                <Input className="input" name="password" type="password" placeholder="Password"
                    value={user.password}
                    onChange={onChange}
                    onKeyUp={onEnter}
                />
            </div>
            <div className="d-flex justify-content-between form-group ">
                <div className="remember-user">
                    <div className="remember-user__check">
                        <Checkbox  checked={isRemember} onChange={onChangeRemember} />
                    </div>
                    <label className="remember-user__lable" onClick={onChangeRemember}  htmlFor="remember">Remember me</label>
                </div>
                <div>
                    <Link className="forgot-password" to="/forgot-password">Forgot</Link>
                </div>
            </div>
            <Button className="btn-submit"
                loading={isLoading} onClick={handleLogin}>
                LOGIN
            </Button>
        </div>
    )
}