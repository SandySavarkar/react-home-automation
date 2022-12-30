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