import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/reducers/root-reducer'
import { LoadingAdvance } from '../common/Loading/Loading'
import { Descriptions, Button, Modal, Form, Input, DatePicker, message } from 'antd'
import { IEmployee } from '../../model/IEmployee'
import moment, { Moment } from 'moment'
import { formatDate, undefinedError, success } from '../../constant'
import { requestEditEmployee } from '../../redux/actions/employee/actions'
import { receiveInfo } from '../../redux/actions/auth/actions'
export const UserInfo = () => {
    const dispatch: any = useDispatch()
    const [visible, setVisible] = useState(false);
    const user: IEmployee | null = useSelector((state: RootState) => state.auth.user)
    const [employee, setEmployee] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        birthday: new Date(),
    })
    const formValid = useMemo(() => {
        const validName = employee.name !== ''
        const validPhone = employee.phoneNumber !== ''
        const validAdress = employee.address !== ''
        const validBirthday = employee.birthday !== undefined
        return {
            name: validName,
            phoneNumber: validPhone,
            address: validAdress,
            birthday: validBirthday,
            valid: validName && validPhone && validAdress && validBirthday
        }
    }, [employee])
    useEffect(() => {
        if (user !== null) {
            const { name, phoneNumber, address, birthday } = user
            setEmployee({
                name, phoneNumber, address, birthday
            })
        }
    }, [user])

    const onChangeEmployee = ({ target: { name, value } }: any) => {
        setEmployee({
            ...employee,
            [name]: value
        })
    }

    const onChangeBirthday = (date: any) => {
        if (date !== null)
            setEmployee({
                ...employee,
                birthday: new Date(date.format().toString())
            })
    }

    const handleEditProfile = () => {
        if (user !== null && formValid.valid) {
            let newEmployee: IEmployee = {
                ...user,
                ...employee
            }
            let hiden = message.loading('editing')
            dispatch(requestEditEmployee(newEmployee)).then((status: number) => {
                hiden();
                switch (status) {
                    case undefinedError:
                        message.error("edit fail", 1)
                        break;
                    case success:
                        message.success(`${newEmployee.name} edited`, 1)
                        dispatch(receiveInfo(newEmployee))
                        setVisible(false)
                        break;
                    default:
                        break;
                }
            })
        } else {
            message.error("form input is not valid");
        }
    }
    return (
        <LoadingAdvance loading={user === null ? true : false}>
            {user !== null && (
                <>
                    <Descriptions title="User Info">
                        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="Point">{user.point}</Descriptions.Item>
                        <Descriptions.Item label="Order count">{user.orderCount}</Descriptions.Item>
                        <Descriptions.Item label="Phone number">{user.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="Birthdate">{moment(user.birthday).format(formatDate)}</Descriptions.Item>
                        <Descriptions.Item label="Join at">{moment(user.createAt).format(formatDate)}</Descriptions.Item>
                        <Descriptions.Item label="Address" span={3} >{user.address}</Descriptions.Item>
                    </Descriptions>
                    <div className="d-flex-center">
                        <Button onClick={() => setVisible(true)}>Edit profile</Button>
                        <Modal
                            visible={visible}
                            title="Edit Profile"
                            onOk={handleEditProfile}
                            onCancel={() => setVisible(false)}
                        >
                            <Form layout="horizontal">
                                <Form.Item label="Name"
                                    help={!formValid.name ? 'input is not valid' : ''}
                                    hasFeedback
                                    validateStatus={!formValid.name ? 'error' : 'success'}
                                >
                                    <Input value={employee.name} onChange={onChangeEmployee} name="name" />
                                </Form.Item>
                                <Form.Item label="Phone number"
                                    help={!formValid.phoneNumber ? 'input is not valid' : ''}
                                    hasFeedback
                                    validateStatus={!formValid.phoneNumber ? 'error' : 'success'}
                                >
                                    <Input value={employee.phoneNumber} onChange={onChangeEmployee} name="phoneNumber" />
                                </Form.Item>
                                <Form.Item label="Address"
                                    help={!formValid.address ? 'input is not valid' : ''}
                                    hasFeedback
                                    validateStatus={!formValid.address ? 'error' : 'success'}
                                >
                                    <Input value={employee.address} onChange={onChangeEmployee} name="address" />
                                </Form.Item>

                                <Form.Item label="Birthday"
                                    help={!formValid.birthday ? 'input is not valid' : ''}
                                    hasFeedback
                                    validateStatus={!formValid.birthday ? 'error' : 'success'}
                                >
                                    <DatePicker format={formatDate} value={moment(employee.birthday)} onChange={onChangeBirthday} />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </>
            )
            }
        </LoadingAdvance >
    )
}