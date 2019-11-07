import React, { useEffect, useState } from 'react'
import { Switch, Route } from "react-router-dom";

import "./Product.scss";
import { Header } from '../../components/common/Header/Header'
import { ProductPanel } from '../../components/ManageProduct/Panel/Panel'
import { ListProduct } from '../../components/ManageProduct/ListProduct/ListProduct'
import { productPath } from '../../config/route-config'
import { Empty } from 'antd';
import { AddProduct } from '../../components/ManageProduct/AddProduct/AddProduct';
import { EditProduct } from '../../components/ManageProduct/EditProduct/EditProduct';
import { ProductDetail } from '../../components/ManageProduct/ProductDetail/ProductDetail';
import { IProduct } from '../../model/types/IProduct';

const ProductPage = ({
    categories,
    fetchProductCategories,
    products,
    isFetching,
    fetchProducts,
    requestAddProduct,
    requestEditProduct,
    requestDeleteProduct,
}: any) => {
    useEffect(() => {
        if (products.length < 1) {
            fetchProducts()
        }
        if (categories.length < 1) {
            fetchProductCategories()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const initState: any = []
    const [displayProducts, setDisplayProducts] = useState(initState)
    useEffect(() => {
        setDisplayProducts([...products])
    }, [products])

    const handleSearchProducts = (name: string) => {
        const result = products.filter((item: IProduct) => item.name.includes(name.toUpperCase()))
        setDisplayProducts([...result])
    }


    return (
        <div className="product">
            <Header title="Product" />
            <div className="product__wrapper" >
                <div className="product__wrapper-left">
                    <ProductPanel 
                    handleSearchProducts={handleSearchProducts}
                    />
                    <ListProduct
                        products={displayProducts}
                        categories={categories}
                        requestDeleteProduct={requestDeleteProduct} />
                </div>
                <div className="product__wrapper-right">
                    <Switch>
                        <Route exact path={`${productPath}`} render={() => <Empty />} />
                        <Route path={`${productPath}/add`} render={props => (
                            <AddProduct
                                {...props}
                                categories={categories}
                                isFetching={isFetching}
                                requestAddProduct={requestAddProduct}
                            />
                        )} />
                        <Route path={`${productPath}/edit/:id`} render={props => {
                            const id = props.match.params.id;
                            const product = products.find((item: any) => item.id === id)
                            return (
                                <EditProduct
                                    {...props}
                                    categories={categories}
                                    product={product ? product : false}
                                    requestEditProduct={requestEditProduct}
                                />)
                        }} />

                        <Route path={`${productPath}/detail/:id`} render={props => {
                            const id = props.match.params.id;
                            const product = products.find((item: any) => item.id === id)
                            return (
                                <ProductDetail
                                    {...props}
                                    categories={categories}
                                    product={product ? product : false}
                                    requestEditProduct={requestEditProduct}
                                />)
                        }} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default ProductPage