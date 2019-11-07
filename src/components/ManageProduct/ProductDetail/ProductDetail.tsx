import React from "react";

import "./ProductDetail.scss";
import { IProductCategory } from "../../../model/types/IProductCategory";
import { IProduct } from "../../../model/types/IProduct";
import { Header } from "../../common/Header/Header";
import { Descriptions, Spin, Badge } from "antd";
import { formatVND } from "../../utils";
import moment from "moment";
import { formatDate, status } from "../../../constant";
export const ProductDetail = ({
    product,
    category,
    isFetching
}: {
    isFetching: boolean,
    product: IProduct,
    category: IProductCategory,
}) => {
    const addDefaultSrc = (e: any) => {
        e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7FydPi5Onw8fS+ws3f4ee6v8v29/jY2+Hu7/Ly9PbJztbQ1dxJagBAAAAC60lEQVR4nO3b2ZaCMBREUQbDJOP//2wbEGVIFCHKTa+zH7uVRVmBBJQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCpdOzvQQqaq2KmuSrOzQ02lSeRem8rpsQq/ozg72Kj4UkAxEev8awnzs7P1yiIadsfpQXjfZCHhUCzbfmeurdNz6bDRsBWRsB+k0cXxdHjpa0wkTBn3hKnjzRZyEgYk3IeEv2RKWCt1cN9EJ0zjfm7Mq/rAVgUnbLpwnK/zA2tnuQmzJHquuqJq91blJuwmAW8rHbV3q2ITFrOAt7Xz3l2UmrBMlpcHe9fOUhOqRYVhFO/cqtSEy0H6bh/tJ1uhCctqlTB/NSnG9pOt1ISXjxLq825laVFowo9GaRPrF9talJqw3n6macaZ09yi1ISG2cLyriwePwxzi1ITru4s2naxma59TC2KTRjE83FqmQ6yeDaUDS3KTRhMV96h5TTSLD4HQ4uCE9bxePUU5pYL/3mD5o9CcMKgTONc39NNLrV5iK4aNLUoOWHQ38RQtW3nsm6db92i8ISvGBtct+hvwqyzBFxE9DehrcHlQPU1YWNvcNGirwlfNThv0ZOE9eJG1OsGZy36kVBdczU9e7RvAz5b9CFhqfIwSp4XwG+OwUWLPiRUV/33Z4tbGtTvGK635CfUDfb/SO5rt20N9t8m65fLT9g3GD5abDY2qC+lvEg4NjhEvLW4tUFvEj4a7OXq3TzoW8Jpg0PEzfk8SThv8EMeJFw1+O8SHmrQg4QHG/Qg4cEGxSc83KD4hIcblJ6w3L508TXh+vtDEpLw3GwDEpKQhOdznVD2fRr9tdpRw/1HqQndIeEvkXCXUlDC+1NBndsnge/fwyVnp9PGH3p95dm1WMKza4/fI37j+UPXR/c+2X9/hjQI0uO3LsyuMioM9A8Sjy/W1iIhY7Sn2tzpUahdWyXiNDNSxcWtSlCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAwCn+AEXGNosxDBhFAAAAAElFTkSuQmCC'
    }
    return (
        <div className="detail-product">
            <Header className="detail-product__title" title="Detail product" />
            <div className="detail-product__info">
                <Spin spinning={isFetching} tip="Loading...">
                    {
                        !isFetching && (
                            <Descriptions layout="vertical" size="small" bordered>
                                <Descriptions.Item label="Name" span={2}>{product.name}</Descriptions.Item>
                                <Descriptions.Item label="Price">{formatVND(product.price)} VNĐ </Descriptions.Item>
                                <Descriptions.Item label="Category" span={3}>{category.name}</Descriptions.Item>
                                <Descriptions.Item label="Create date">{moment(product.createAt, formatDate).format(formatDate)}</Descriptions.Item>
                                <Descriptions.Item label="Last updae" span={2} >{moment(product.updateAt, formatDate).format(formatDate)}</Descriptions.Item>
                                <Descriptions.Item label="Status" span={3} >
                                    {!product.isDeleted ?
                                        <Badge status="success" text={status.active} /> :
                                        <Badge status="error" text={status.stop} />
                                    }
                                </Descriptions.Item>
                                <Descriptions.Item label="Image" span={3}>
                                    <img onError={addDefaultSrc} className="img" src={product.imgURL} alt="product" />
                                </Descriptions.Item>
                            </Descriptions>
                        )
                    }
                </Spin>
            </div>
        </div>
    )
}