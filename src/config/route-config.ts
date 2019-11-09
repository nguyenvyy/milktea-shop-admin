import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute'
//path
export const productCategoryPath = '/a/type/product-category'
export const productPath = '/a/product'

const Admin = lazy(() => import('../layout/Admin/Admin'))
const Test = lazy(() => import('../pages/TestFirebase/TestFirebase'))
const ProductPage = lazy(() => import('../redux/container/Product'))
const ProductCategoryPage = lazy(() => import('../redux/container/ProductCategory'))
const VIPPage = lazy(() => import('../redux/container/VIP'))



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
                path: '/a/type/product-category',
                component: ProductCategoryPage
            },
            {
                path: '/a/type/vip',
                component: VIPPage
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