import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute'
//path
export const productCategoryPath = '/a/type/product-category'

const Admin = lazy(() => import('../layout/Admin/Admin'))
const Test = lazy(() => import('../pages/TestFirebase/TestFirebase'))
const ProductPage = lazy(() => import('../redux/container/Product'))
const ProductCategoryContainer = lazy(() => import('../redux/container/ProductCategory'))

export const routes = [
    {
        path: '/',
        customRoute: Redirect,
        to: '/a',
        exact: true,
    },
    {
        path: '/a',
        component: Admin,
        customRoute: PrivateRoute,
        routes: [
            {
                path: '/a',
                exact: true,
                customRoute: Redirect,
                to: '/a/product'
            },
            {
                path: '/a/type',
                customRoute: Redirect,
                to: '/a/type/product-category',
                exact: true
            },
            {
                path: productCategoryPath,
                component: ProductCategoryContainer
            },
            {
                path: '/a/test',
                component: Test,
            },
            {
                path: '/a/product',
                component: ProductPage
            }
        ]
    }
]