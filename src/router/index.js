import { lazy } from 'react'

const Login = lazy(() => import('../components/login/Login'))
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'))
const AllDevices = lazy(() => import('../components/device-management/allDevices'))
const AllUsers = lazy(() => import('../components/user-management/allUsers'))
const DeviceDetails = lazy(() => import('../components/device-management/deviceDetails'))
const UserDetails = lazy(() => import('../components/user-management/userDetails'))
const AddNewUser = lazy(() => import('../components/user-management/addNewUser'))
const EditUser = lazy(() => import('../components/user-management/editUser'))
const EditDevice = lazy(() => import('../components/device-management/editDevice'))

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
    },
    {
        id: "all_users",
        label: "All Users",
        exact: true,
        path: "/all-users",
        isPrivate: true,
        element: <AllUsers/>
    },
    {
        id: "all_devices",
        label: "All Devices",
        exact: true,
        path: "/all-devices",
        isPrivate: true,
        element: <AllDevices/>
    },
    {
        id: "user_details",
        label: "User Details",
        exact: true,
        path: "/user-details/:id",
        isPrivate: true,
        element: <UserDetails/>
    },
    {
        id: "device_details",
        label: "Device Details",
        exact: true,
        path: "/device/:id",
        isPrivate: true,
        element: <DeviceDetails/>
    },
    {
        id: "edit_device",
        label: "Edit Device",
        exact: true,
        path: "/edit-device/:id",
        isPrivate: true,
        element: <EditDevice/>
    },
    {
        id: "add_new_user",
        label: "New User",
        exact: true,
        path: "/add-new-user",
        isPrivate: true,
        element: <AddNewUser/>
    },
    {
        id: "edit_user",
        label: "Edit User",
        exact: true,
        path: "/edit-user/:id",
        isPrivate: true,
        element: <EditUser/>
    }
]

export const isAuthRoutes = () => allRoutes.filter(({isAuth}) => isAuth)
export const isPrivateRoutes = () => allRoutes.filter(({isPrivate}) => isPrivate)