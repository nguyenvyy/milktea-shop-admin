import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Icon, Tooltip,
    message
} from 'antd'

import './UserInfo.scss'
import { RootState } from '../../../redux/reducers/root-reducer'
import { IEmployee } from '../../../model/IEmployee'
import { signOut } from '../../../redux/actions/auth/actions'

export const UserInfo = memo(
    function UserInfo({ collapsed }: any) {
        const dispatch: any = useDispatch();
        const userInfo: IEmployee |  null = useSelector((state: RootState) => state.auth.user)
        const handleLogout = () => {
            dispatch(signOut()).then((res: any) => {
                switch (res.status) {
                    case 200:
                        message.success('Logout success',1)
                        break;
                    default:
                        message.error('Error', 1)
                        break;
                }
            })
        }
        return (
            <div className={`user-paner${collapsed ? '-collapsed' : ''}`}>
                {
                    !collapsed ? (
                        <>
                            <div className="user-name ">
                                <span>
                                    {userInfo !== null ? userInfo.name : 'loading...'}
                                </span>
                            </div>
                            <span onClick={handleLogout} className="pointer">
                                <Icon type="logout" />
                            </span>
                        </>
                    ) : (
                            <Tooltip placement="right" title={`Logout! ${userInfo !== null ? userInfo.name : 'loading...'}`}>
                                <span onClick={handleLogout}>
                                    <Icon style={{ fontSize: '20px' }} type="logout" />
                                </span>
                            </Tooltip>
                        )
                }
            </div>
        )
    }
)
