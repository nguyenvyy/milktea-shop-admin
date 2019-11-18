import React, { useState, useEffect, useMemo } from "react";

import "./EditEmployee.scss";
import { undefinedError, success } from "../../../constant";
import { message, Form, Select, Button, Spin, Input } from "antd";
import { Header } from "../../common/Header/Header";
import { IRole } from "../../../model/constant-types-interface";
import { FirebaseServices } from "../../../services/firebase";
import { IEmployee } from "../../../model/IEmployee";
export const EditEmployee = ({
    isFetching,
    roles,
    employee: preEmployee,
    requestEditEmployee,
}: any) => {
    const [employee, setEmployee] = useState({
        idRole: '',
        name: ''
    })
    useEffect(() => {
        if (preEmployee !== false)
            setEmployee({ name: preEmployee.name, idRole: preEmployee.idRole })
    }, [preEmployee])

    const onChangeIdRole = (value: string) => {
        setEmployee({
            ...employee,
            idRole: value
        })
    }

    const onChangeName = (e: any) => {
        setEmployee({...employee, name: e.target.value})
    }

    const handleEditEmployee = () => {
        const newEmployee: IEmployee = {
            ...preEmployee,
            ...employee
        }

        requestEditEmployee(newEmployee).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("edit fail", 1)
                    break;
                case success:
                    message.success(`${newEmployee.name} edited`, 1)
                    break;
                default:
                    break;
            }
        })
    }

    const handleResetPassword = () => {
        const hiden = message.loading('sending...')
        FirebaseServices.sendMailToResetPassword(preEmployee.email).then(() => {
            hiden()
            message.success('send success', 1)
        })
            .catch(() => {
                hiden()
                message.success('send fail', 1)

            })
    }
    const formValid = useMemo(() => {
        return employee.idRole !== ''
    }, [employee])

    return (
        <div className="edit-employee">
            <Header className="edit-employee__title" title={`Edit employee`} />
            <div className="edit-form">
                <Spin spinning={isFetching} tip="Loading...">
                    <Form.Item label="Name"
                        help={employee.name === '' ? 'input is not valid' : ''}
                        hasFeedback
                        validateStatus={employee.name === '' ? 'error' : 'success'}
                    >
                        <Input value={employee.name} onChange={onChangeName} name="name" />
                    </Form.Item>
                    <Form.Item label="Role"
                        help={!formValid ? 'input is not valid' : ''}
                        validateStatus={!formValid ? 'error' : 'success'}
                    >
                        <Select value={employee.idRole} onChange={onChangeIdRole} loading={roles.length !== 0 ? false : true} style={{ width: 220 }}>
                            {roles.map((item: IRole) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item className="edit-employee__form-button">
                        <Button
                            onClick={handleResetPassword}
                            loading={isFetching} disabled={preEmployee.email !== undefined ? false : true} type="primary" icon="rise">Send email to reset password</Button>
                    </Form.Item>
                    <Form.Item className="edit-employee__form-button">
                        <Button
                            onClick={handleEditEmployee}
                            loading={isFetching} disabled={!formValid ? true : false} type="primary" icon="save">Edit</Button>
                    </Form.Item>
                </Spin>
            </div>
        </div>
    )
}