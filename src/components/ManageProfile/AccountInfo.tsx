import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/reducers/root-reducer'
import { LoadingAdvance } from '../common/Loading/Loading'
import { Descriptions, Button, Modal, Input, Form, message } from 'antd'
import { IEmployee } from '../../model/IEmployee'
import { IRole } from '../../model/constant-types-interface'
import { fetchConstantTypes } from '../../redux/actions/constant-type/actions'
import { FirebaseServices } from '../../services/firebase'

export const AccountInfo = () => {
    const dispatch = useDispatch();
    const user: IEmployee | null = useSelector((state: RootState) => state.auth.user)
    const roles: IRole[] = useSelector((state: RootState) => state.constantType.roles)
    useEffect(() => {
        if (roles.length === 0)
            dispatch(fetchConstantTypes())
    })
    const roleName = useMemo(() => {
        if (user !== null && roles.length > 0) {
            const role: IRole | undefined = roles.find(role => role.id === user.idRole)
            if (role !== undefined)
                return role.name
            else
                return 'loading...!'
        }
        return 'loading...!'
    }, [user, roles])
    const [password, setPassword] = useState('');
    const onChangePassword = (e: any) => {
        setPassword(e.target.value)
    }
    const [visible, setVisible] = useState(false);
    const handleUpdatePassword = () => {
        if (password.length < 6) {
            message.error('password must be greater than 6 character', 2)
        }
        else {
            let user = FirebaseServices.auth.currentUser;
            if(user !==  null) {
                let hiden = message.loading('changing...')
                user.updatePassword(password).then(function () {
                    // Update successful.
                    setVisible(false)
                    hiden()
                    message.success('change password success', 1)
                }).catch(function (error) {
                    // An error happened.
                    hiden()
                    message.error('change password failed', 1)
                });
            } else {
                message.error('There was an error during execution', 1)
            }
        }
    }

    return (
        <LoadingAdvance loading={(user === null && roles.length === 0) ? true : false}>
            {user !== null && (
                <>
                    <Descriptions title="Account Info">
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Role">{roleName}</Descriptions.Item>
                    </Descriptions>
                    <div className="d-flex-center">
                        <Button onClick={() => setVisible(true)}>Change password</Button>
                        <Modal
                            visible={visible}
                            title="Change Password"
                            onOk={handleUpdatePassword}
                            onCancel={() => setVisible(false)}
                        >
                            <Form layout="horizontal">
                                <Form.Item label="Name"
                                    help={password.length < 6 ? 'password must be greater than 6 character' : ''}
                                    hasFeedback
                                    validateStatus={password.length < 6 ? 'error' : 'success'}
                                >
                                    <Input className="input" name="password" type="password" placeholder="Password"
                                        value={password}
                                        onChange={onChangePassword}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </>
            )}
        </LoadingAdvance>
    )
}