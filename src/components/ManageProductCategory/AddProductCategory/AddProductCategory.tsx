import React, { useState } from "react";
import { Header } from "../../common/Header/Header";
import { Form, Input, Button, message } from "antd";

import "./AddProductCategory.scss";
import { IProductCategory } from "../../../model/types/IProductCategory";
import { undefinedError, success } from "../../../constant";
export const AddProductCategory = ({
    isFetching,
    requestAddProductCategory,
}: any) => {
    

    const [name, setName] = useState('')
    const onChangeName = (e: any) => {
        let name: string = e.target.value
        setName(name.trimStart())
    }

    const handleAddCategory = () => {
        const newCategory: IProductCategory = {
            id: '',
            name: name,
            isDeleted: false,
            createAt: new Date(),
            updateAt: new Date()
        }
        requestAddProductCategory(newCategory).then((status: number) => {
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
        <div className="add-product-category">
            <Header className="add-product-category__title" title="Add new category" />
            <div className="add-product-category__form">
                <Form layout="horizontal">
                    <Form.Item label="Name">
                        <Input value={name} onChange={onChangeName} name="name" />
                    </Form.Item>
                    <Form.Item className="add-product-category__form-button">
                        <Button
                            onClick={handleAddCategory}
                            loading={isFetching} disabled={name === '' ? true : false} type="primary" icon="save">Add</Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}