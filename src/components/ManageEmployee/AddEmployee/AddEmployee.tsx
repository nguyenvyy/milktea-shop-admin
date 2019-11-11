import React, { useState, useMemo, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { Form, Input, Button, message, DatePicker, Select } from "antd";

import "./AddEmployee.scss";
import { undefinedError, success, formatDate } from "../../../constant";
import moment from "moment";
import { IEmployee } from "../../../model/IEmployee";
import { IRole } from "../../../model/constant-types-interface";
export const AddEmployee = ({
    roles,
    isFetching,
    requestAddEmployee,
}: any) => {
    const [employee, setEmployee] = useState({
        idRole: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthday: new Date(),
    })

    const onchangeEmployee = ({ target: { name, value } }: any) => {
        setEmployee({
            ...employee,
            [name]: value
        })
    }

    const onChangeBirthday = (birthday: any) => {
        setEmployee({
            ...employee,
            birthday: new Date(moment(birthday).format().toString())
        })
    }

    const onChangeIdRole = (value: string) => {
        setEmployee({
            ...employee,
            idRole: value
        })
    }


    const formValid = useMemo(() => {
        const validName = employee.name !== ''
        const validEmail = employee.email !== ''
        const validIdRole = employee.idRole !== ''
        const validPhone = employee.phoneNumber !== ''
        const validAdress = employee.address !== ''
        const validBirthday = employee.birthday !== undefined
        return {
            idRole: validIdRole,
            name: validName,
            email: validEmail,
            phoneNumber: validPhone,
            address: validAdress,
            birthday: validBirthday,
            valid: validName && validEmail && validIdRole && validPhone && validAdress && validBirthday
        }
    }, [employee])

    const handleAddEmployee = () => {
        const newEmployee: IEmployee = {
            id: '',
            point: 0,
            orderCount: 0,
            isDeleted: false,
            ...employee
        }
        requestAddEmployee(newEmployee).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("add fail", 1)
                    break;
                case success:
                    message.success(`${newEmployee.name} added`, 1)
                    break;
                default:
                    break;
            }
        })

    }


    return (
        <div className="add-employee">
            <Header className="add-employee__title" title="Add new employee" />
            <div className="add-form">
                <Form layout="horizontal">
                    <Form.Item label="Name"
                        help={!formValid.name ? 'input is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.name ? 'error' : 'success'}
                    >
                        <Input value={employee.name} onChange={onchangeEmployee} name="name" />
                    </Form.Item>
                    <Form.Item label="Email"
                        help={!formValid.email ? 'input is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.email ? 'error' : 'success'}
                    >
                        <Input type="email" placeholder="example@gmail.com" value={employee.email} onChange={onchangeEmployee} name="email" />
                    </Form.Item>
                    <Form.Item label="Role"
                        help={!formValid.idRole ? 'input is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.idRole ? 'error' : 'success'}
                    >
                        <Select value={employee.idRole} onChange={onChangeIdRole} loading={roles.length !== 0 ? false : true} style={{ width: 220 }}>
                            {roles.map((item: IRole) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Phone number"
                        help={!formValid.phoneNumber ? 'input is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.phoneNumber ? 'error' : 'success'}
                    >
                        <Input value={employee.phoneNumber} onChange={onchangeEmployee} name="phoneNumber" />
                    </Form.Item>
                    <Form.Item label="Address"
                        help={!formValid.address ? 'input is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.address ? 'error' : 'success'}
                    >
                        <Input value={employee.address} onChange={onchangeEmployee} name="address" />
                    </Form.Item>

                    <Form.Item label="Birthday"
                        help={!formValid.birthday ? 'input is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.birthday ? 'error' : 'success'}
                    >
                        <DatePicker format={formatDate} value={moment(employee.birthday)} onChange={onChangeBirthday} />
                    </Form.Item>

                    <Form.Item className="add-employee__form-button">
                        <Button
                            onClick={handleAddEmployee}
                            loading={isFetching} disabled={!formValid.valid ? true : false} type="primary" icon="save">Add</Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}