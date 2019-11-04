import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute'
import { exact } from 'prop-types'

const Admin = lazy(() => import('../layout/Admin/Admin'))
const Test = lazy(() => import('../pages/TestFirebase/TestFirebase'))
const ProductPage = lazy(() => import('../pages/Product/Product'))
const ProductCategoryPage = lazy(() => import('../pages/ProductCategory/ProductCategory'))
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