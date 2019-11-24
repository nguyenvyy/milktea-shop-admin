import React, { useState, useMemo } from "react";
import { Header } from "../../common/Header/Header";
import { Form, Input, Button, message } from "antd";

import "./AddVIP.scss";
import { IVIP } from "../../../model/IVIP";
import { undefinedError, success } from "../../../constant";
export const AddVIP = ({
    isFetching,
    requestAddVIP,
}: any) => {
    const [name, setName] = useState('')
    const onChangeName = (e: any) => {
        let name: string = e.target.value
        setName(name.trimStart())
    }
    const [point, setPoint] = useState(0)
    const onChangePoint = (e: any) => {
        setPoint(+e.target.value)
    }

    const formValid = useMemo(() => {
        const validName = name !== ''
        const validPoint = point >= 0
        return {
            name: validName,
            point: validPoint,
            valid: validName === true && validPoint === true
        }
    }, [name, point])

    const handleAddCategory = () => {
        const newvip: IVIP = {
            id: '',
            name,
            point,
            isDeleted: false
        }
        requestAddVIP(newvip).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("add fail", 1)
                    break;
                case success:
                    message.success(`${name} added`, 1)
                    break;
                default:
                    break;
            }
        })

    }


    return (
        <div className="add-vip">
            <Header className="add-vip__title" title="Add new VIP" />
            <div className="add-vip__form">
                <Form layout="horizontal">
                    <Form.Item label="Name"
                        help={!formValid.name ? 'name is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.name ? 'error' : 'success'}
                    >
                        <Input value={name} onChange={onChangeName} name="name" />
                    </Form.Item>
                    <Form.Item label="Point"
                        help={!formValid.point ? 'point is not valid' : ''}
                        hasFeedback
                        validateStatus={!formValid.point ? 'error' : 'success'}
                    >
                        <Input type="number" value={point} onChange={onChangePoint} name="point" />
                    </Form.Item>
                    <Form.Item className="add-vip__form-button">
                        <Button
                            onClick={handleAddCategory}
                            loading={isFetching} disabled={!formValid.valid ? true : false} type="primary" icon="save">Add</Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}