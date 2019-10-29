import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute'

const Admin = lazy(() => import('../layout/Admin/Admin'))
const Test = lazy(() => import('../pages/TestFirebase/TestFirebase'))
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
                path: '/a/test',
                component: Test,
            },
        ]
    }
]