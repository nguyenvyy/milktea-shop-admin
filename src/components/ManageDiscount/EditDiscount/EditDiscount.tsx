import React, { useState, useMemo, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { Form, Input, Button, message, Spin } from "antd";

import { IDiscount } from "../../../model/IDiscount";
import { undefinedError, success } from "../../../constant";
export const EditDiscount = ({
    isFetching,
    requestEditDiscount,
    discount: preDiscount
}: any) => {

    const [discount, setDiscount] = useState({
        name: '',
        value: 0,
        duration: 0,
    })

    useEffect(() => {
        if (preDiscount !== false) {
            setDiscount({ ...preDiscount })
        }
    }, [preDiscount])

    const onchangeDiscount = ({ target: { name, value } }: any) => {
        let newValue = value
        switch (name) {
            case 'value':
                newValue = +value
                break;
            case 'duration':
                newValue = +value
                break;
            default:
                break;
        }
        setDiscount({
            ...discount,
            [name]: newValue
        })
    }


    const formValid = useMemo(() => {
        const validName = discount.name !== ''
        const validValue = discount.value > 0
        const validDuration = discount.duration > 0
        return {
            name: validName,
            duration: validDuration,
            value: validValue,
            valid: validName && validValue && validDuration
        }
    }, [discount])

    const handleAddDiscount = () => {
        const newDiscount: IDiscount = {
            ...preDiscount,
            ...discount
        }
        requestEditDiscount(newDiscount).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("edit fail", 1)
                    break;
                case success:
                    message.success(`${newDiscount.name} edited`, 1)
                    break;
                default:
                    break;
            }
        })
    }


    return (
        <div className="add-discount">
            <Header className="add-discount__title" title="Edit discount" />
            <div className="add-discount__form">
                <Spin spinning={preDiscount === false ? true : false} tip="Loading...">
                    <Form layout="horizontal" >
                        <Form.Item label="Name"
                            help={!formValid.name ? 'name is not valid' : ''}
                            hasFeedback
                            validateStatus={!formValid.name ? 'error' : 'success'}
                        >
                            <Input value={discount.name} onChange={onchangeDiscount} name="name" />
                        </Form.Item>
                        <Form.Item label="Value"
                            help={!formValid.value ? 'value is not valid' : ''}
                            hasFeedback
                            validateStatus={!formValid.value ? 'error' : 'success'}
                        >
                            <Input type="number" value={discount.value} onChange={onchangeDiscount} name="value" />
                        </Form.Item>
                        <Form.Item label="Duration (day)"
                            help={!formValid.duration ? 'duration is not valid' : ''}
                            hasFeedback
                            validateStatus={!formValid.duration ? 'error' : 'success'}
                        >
                            <Input type="number" value={discount.duration} onChange={onchangeDiscount} name="duration" />
                        </Form.Item>
                        <Form.Item className="add-discount__form-button">
                            <Button
                                onClick={handleAddDiscount}
                                loading={isFetching} disabled={!formValid.valid ? true : false} type="primary" icon="save">Edit</Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}