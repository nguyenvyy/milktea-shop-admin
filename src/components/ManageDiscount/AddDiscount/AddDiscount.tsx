import React, { useState, useMemo } from "react";
import { Header } from "../../common/Header/Header";
import { Form, Input, Button, message } from "antd";

import "./AddDiscount.scss";
import { IDiscount } from "../../../model/IDiscount";
import { undefinedError, success } from "../../../constant";
export const AddDiscount = ({
    isFetching,
    requestAddDiscount,
    discounts
}: any) => {

    const [discount, setDiscount] = useState({
        name: '',
        value: 0,
        code: '',
        minPoint: 0,
    })

    const onchangeDiscount = ({ target: { name, value } }: any) => {
        let newValue = value
        switch (name) {
            case 'code':
                newValue = value.toUpperCase()
                break;
            case 'value':
                newValue = +value
                break;
            case 'minPoint':
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
        const validCode = discount.code !== ''
        const validPoint = discount.minPoint > 0
        return {
            name: validName,
            minPoint: validPoint,
            value: validValue,
            code: validCode,
            valid: validName && validValue && validCode && validPoint
        }
    }, [discount])

    const handleAddDiscount = () => {
        const newDiscount: IDiscount = {
            id: '',
            isDeleted: false,
            ...discount
        }
        const isExistName = discounts.find((item: any) => item.code === newDiscount.code)
        if (isExistName) {
            message.error("code existed", 1)
        } else {
            requestAddDiscount(newDiscount).then((status: number) => {
                switch (status) {
                    case undefinedError:
                        message.error("add fail", 1)
                        break;
                    case success:
                        message.success(`${newDiscount.name} added`, 1)
                        break;
                    default:
                        break;
                }
            })
        }

    }


    return (
        <div className="add-discount">
            <Header className="add-discount__title" title="Add new discount" />
            <div className="add-discount__form">
                <Form layout="horizontal">
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
                    <Form.Item label="Point"
                        help={!formValid.minPoint ? 'point is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.minPoint ? 'error' : 'success'}
                    >
                        <Input type="number" value={discount.minPoint} onChange={onchangeDiscount} name="minPoint" />
                    </Form.Item>
                    <Form.Item label="Code"
                        help={!formValid.code ? 'code is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.code ? 'error' : 'success'}
                    >
                        <Input value={discount.code} onChange={onchangeDiscount} name="code" />
                    </Form.Item>
                    <Form.Item className="add-discount__form-button">
                        <Button
                            onClick={handleAddDiscount}
                            loading={isFetching} disabled={!formValid.valid ? true : false} type="primary" icon="save">Add</Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}