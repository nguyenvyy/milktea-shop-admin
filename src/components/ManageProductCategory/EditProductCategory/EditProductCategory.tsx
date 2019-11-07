import React, { useState, useEffect } from "react";
import { Spin, Form, Input, Button, message } from "antd";
import { Header } from "../../common/Header/Header";
import { undefinedError, success } from "../../../constant";
import { IProductCategory } from "../../../model/types/IProductCategory";

export const EditProductCategory = ({
    isFetching,
    category,
    requestEditProductCategory,
}: any) => {

    const [name, setName] = useState('')
    useEffect(() => {
        if(category !== false) {
            setName(category.name)
        }
    }, [category])
    const onChangeName = (e: any) => {
        let name: string = e.target.value
        setName(name.trimStart())
    }

    const handleEditCategory = () => {
        const newCategory: IProductCategory = {
            ...category,
            name: name,
            updateAt: new Date()
        }
        requestEditProductCategory(newCategory).then((status: number) => {
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
        <div className="add-product-category">
            <Header className="add-product-category__title" title="Edit category" />
            <Spin spinning={category === false ? true : false} tip="Loading...">
                <div className="add-product-category__form">
                <Form layout="horizontal">
                    <Form.Item label="Name">
                        <Input value={name} onChange={onChangeName} name="name" />
                    </Form.Item>
                    <Form.Item className="add-product-category__form-button">
                        <Button
                            onClick={handleEditCategory}
                            loading={isFetching} disabled={name === '' ? true : false} type="primary" icon="edit">Edit</Button>
                    </Form.Item>
                </Form>
                </div>
            </Spin>
        </div>
    )
}