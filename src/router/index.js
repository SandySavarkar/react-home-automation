import { lazy } from 'react'

const Login = lazy(() => import('../components/login/Login'))
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'))

export const allRoutes = [
    {
        id: "root_login",
        label: "Login",
        exact: true,
        path: "/",
        isAuth: true,
        element: <Login/>
    },
    {
        id: "login",
        label: "Login",
        exact: true,
        path: "/login",
        isAuth: true,
        element: <Login/>
    },
    {
        id: "dashboard",
        label: "Dashboard",
        exact: true,
        path: "/dashboard",
        isPrivate: true,
        element: <Dashboard/>
    }
]

export const isAuthRoutes = () => allRoutes.filter(({isAuth}) => isAuth)
export const isPrivateRoutes = () => allRoutes.filter(({isPrivate}) => isPrivate)