import React, { useState, useEffect, useMemo } from "react";

import "./EditProduct.scss";
import { IProductCategory } from "../../../model/types/IProductCategory";
import { IProduct } from "../../../model/types/IProduct";
import { undefinedError, success } from "../../../constant";
import { message, Form, Input, Select, Button } from "antd";
import { Header } from "../../common/Header/Header";
export const EditProduct = ({
    categories,
    product: preProduct,
    isFetching,
    requestEditProduct
}: {
    isFetching: boolean,
    categories: IProductCategory[],
    product: IProduct,
    requestEditProduct: any
}) => {

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        imgURL: '',
        categoryId: ''
    })

    useEffect(() => {
        setProduct({ ...preProduct })
    }, [preProduct])
    const formValid = useMemo(() => {
        if (product.name !== '' && product.price > 1000 && product.categoryId !== "" && product.imgURL !== '')
            return true
        else
            return false
    }, [product])

    const onChange = ({ target: { name, value } }: any) => {
        let newValue = value
        if (name === 'price') {
            newValue = Math.ceil(+value);
            if (newValue > 1000)
                newValue = newValue - newValue % 1000
            if (newValue < 0)
                return
        }
        setProduct({
            ...product,
            [name]: newValue
        })
    }

    const onChangeSelect = (value: string) => {
        setProduct({
            ...product,
            categoryId: value
        })
    }

    const addDefaultSrc = (e: any) => {
        e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7FydPi5Onw8fS+ws3f4ee6v8v29/jY2+Hu7/Ly9PbJztbQ1dxJagBAAAAC60lEQVR4nO3b2ZaCMBREUQbDJOP//2wbEGVIFCHKTa+zH7uVRVmBBJQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCpdOzvQQqaq2KmuSrOzQ02lSeRem8rpsQq/ozg72Kj4UkAxEev8awnzs7P1yiIadsfpQXjfZCHhUCzbfmeurdNz6bDRsBWRsB+k0cXxdHjpa0wkTBn3hKnjzRZyEgYk3IeEv2RKWCt1cN9EJ0zjfm7Mq/rAVgUnbLpwnK/zA2tnuQmzJHquuqJq91blJuwmAW8rHbV3q2ITFrOAt7Xz3l2UmrBMlpcHe9fOUhOqRYVhFO/cqtSEy0H6bh/tJ1uhCctqlTB/NSnG9pOt1ISXjxLq825laVFowo9GaRPrF9talJqw3n6macaZ09yi1ISG2cLyriwePwxzi1ITru4s2naxma59TC2KTRjE83FqmQ6yeDaUDS3KTRhMV96h5TTSLD4HQ4uCE9bxePUU5pYL/3mD5o9CcMKgTONc39NNLrV5iK4aNLUoOWHQ38RQtW3nsm6db92i8ISvGBtct+hvwqyzBFxE9DehrcHlQPU1YWNvcNGirwlfNThv0ZOE9eJG1OsGZy36kVBdczU9e7RvAz5b9CFhqfIwSp4XwG+OwUWLPiRUV/33Z4tbGtTvGK635CfUDfb/SO5rt20N9t8m65fLT9g3GD5abDY2qC+lvEg4NjhEvLW4tUFvEj4a7OXq3TzoW8Jpg0PEzfk8SThv8EMeJFw1+O8SHmrQg4QHG/Qg4cEGxSc83KD4hIcblJ6w3L508TXh+vtDEpLw3GwDEpKQhOdznVD2fRr9tdpRw/1HqQndIeEvkXCXUlDC+1NBndsnge/fwyVnp9PGH3p95dm1WMKza4/fI37j+UPXR/c+2X9/hjQI0uO3LsyuMioM9A8Sjy/W1iIhY7Sn2tzpUahdWyXiNDNSxcWtSlCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAwCn+AEXGNosxDBhFAAAAAElFTkSuQmCC'
    }
    const handleEditProduct = () => {
        requestEditProduct(product).then((status: number) => {
            switch (status) {
                case undefinedError:
                    message.error("Edit fail", 1)
                    break;
                case success:
                    message.success(`${product.name} edited`, 1)
                    break;
                default:
                    break;
            }
        })
    }
    return (
        <div className="edit-product">
        <Header className="edit-product__title" title="Edit product" />
        <div className="edit-form">
            <Form layout="vertical" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                <Form.Item label="Name:">
                    <Input value={product.name} onChange={onChange} name="name" />
                </Form.Item>
                <Form.Item label="Price:">
                    <Input type="number" value={product.price} onChange={onChange} name="price" />
                </Form.Item>
                <Form.Item label="Category:" wrapperCol={{ span: 8 }}>
                    <Select
                        value={product.categoryId}
                        onChange={onChangeSelect}
                        loading={categories.length > 0 ? false : true}
                    >
                        {categories.map((item: IProductCategory) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Image Url:" >
                    <Input value={product.imgURL} onChange={onChange} name="imgURL" />
                    <img onError={addDefaultSrc} className="edit-form__img" src={product.imgURL} alt="product" />

                </Form.Item>
            </Form>
            <div className="edit-form-button">
                <Button
                    onClick={handleEditProduct}
                    disabled={!formValid}
                    loading={isFetching} type="primary" icon="save">Edit</Button>
            </div>

        </div>
    </div>
    )
}