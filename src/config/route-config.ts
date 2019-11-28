import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute'
import { AdminRoute } from '../routes/AdminRoute'
//path
export const productPath = '/a/product'
export const employeePath = '/a/employee'
export const profilePath = '/a/user-profile'
export const productCategoryPath = '/a/type/product-category'
export const vipPath = '/a/type/vip'
export const discountPath = '/a/type/discount'
export const membershipPath = '/a/membership'
export const orderPath = '/a/order'
export const processingOrderPath = '/a/order/processing'
export const processedOrderPath = '/a/order/processed'
export const salesReportPath = '/a/report/sales'
interface MyRoute {
    path: string
    to?: string
    customRoute?: React.ReactNode
    component?: React.ReactNode
    exact?: boolean
    routes?: Array<MyRoute>
}

const Admin = lazy(() => import('../layout/Admin/Admin'))
const ProductPage = lazy(() => import('../redux/container/Product'))
const ProductCategoryPage = lazy(() => import('../redux/container/ProductCategory'))
const VIPPage = lazy(() => import('../redux/container/VIP'))
const DiscountPage = lazy(() => import('../redux/container/Disccount'))
const ConstantTypePage = lazy(() => import('../redux/container/ConstantType'))
const EmployeePage = lazy(() => import('../redux/container/Employee'))
const LoginPage = lazy(() => import('../pages/Login/Login'))
const ProfilePage = lazy(() => import('../pages/Profile/Profile'))
const MembershipPage = lazy(() => import('../pages/Membership/Membership'))
const ProcessingOrderPage = lazy(() => import('../pages/ProcessingOrder/ProcessingOrder'))
const ProcessedOrderPage = lazy(() => import('../pages/ProcessedOrder/ProcessedOrder'))
const ReportPage = lazy(() => import('../pages/Report/Report'))
const SalesReportPage = lazy(() => import('../components/ManageReport/SalesReport/SalesReport'))
export const routes: Array<MyRoute> = [
    {
        path: '/',
        customRoute: Redirect,
        to: '/a',
        exact: true,
    },
    {
        path: '/login',
        component: LoginPage,
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
                path: '/a/order',
                customRoute: Redirect,
                to: '/a/order/processing',
                exact: true
            },
            {
                path: '/a/order/processing',
                component: ProcessingOrderPage
            },
            {
                path: '/a/order/processed',
                component: ProcessedOrderPage
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
                path: '/a/type/discount',
                component: DiscountPage
            },
            {
                path: '/a/type/orther',
                component: ConstantTypePage
            },
            {
                path: '/a/product',
                component: ProductPage
            },
            {
                path: '/a/employee',
                component: EmployeePage,
                customRoute: AdminRoute
            },
            {
                path: '/a/user-profile',
                component: ProfilePage
            },
            {
                path: '/a/membership',
                component: MembershipPage
            },
            {
                path: '/a/report',
                component: ReportPage,
                customRoute: AdminRoute,
                routes: [
                    {
                        path: '/a/report',
                        exact: true,
                        customRoute: Redirect,
                        to: '/a/report/sales',
                    },
                    {
                        path: '/a/report/sales',
                        component: SalesReportPage
                    }
                ]
            }
        ]
    }
]