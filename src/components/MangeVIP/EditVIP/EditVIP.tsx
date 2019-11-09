import React, { useState, useEffect, useMemo } from "react";
import { Spin, Form, Input, Button, message } from "antd";
import { Header } from "../../common/Header/Header";
import { undefinedError, success } from "../../../constant";
import { IVIP } from "../../../model/IVIP";

export const EditVIP = ({
    isFetching,
    vip,
    requestEditVIP,
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
    useEffect(() => {
        if(vip !== false) {
            setName(vip.name)
            setPoint(vip.point)
        }
    }, [vip])

    const formValid = useMemo(() => {
        const validName = name !== ''
        const validPoint = point > 0
        return {
            name: validName,
            point: validPoint,
            valid: validName === true && validPoint === true
        }
    }, [name, point])

    const handleEditVIP = () => {
        const newvip: IVIP = {
            ...vip,
            name,
            point
        }
        requestEditVIP(newvip).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("edit fail", 1)
                    break;
                case success:
                    message.success(`${name} edited`, 1)
                    break;
                default:
                    break;
            }
        })

    }
    return (
        <div className="add-vip">
            <Header className="add-vip__title" title="Edit VIP" />
            <Spin spinning={vip === false ? true : false} tip="Loading...">
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
                            onClick={handleEditVIP}
                            loading={isFetching} disabled={!formValid.valid ? true : false} type="primary" icon="save">Edit</Button>
                    </Form.Item>
                </Form>
                </div>
            </Spin>
        </div>
    )
}