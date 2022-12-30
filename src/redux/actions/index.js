import { constant } from '../../constant/index'

export const logOutAdmin = (payload = {}) => {
    return {
        type: constant.LOGGED_OUT,
        payload
    }
}

export const getAdminLoginCredentials = (payload = {}) => {
    return {
        type: constant.GET_ADMIN_CREDENTIALS,
        payload
    }
}

export const getAllDevicesAction = (payload = {}) => {
    return {
        type: constant.GET_ALL_DEVICES,
        payload
    }
}

export const getAllUsersAction = (payload = {}) => {
    return {
        type: constant.GET_ALL_USERS,
        payload
    }
}