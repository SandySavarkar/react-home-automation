import jwt_decode from 'jwt-decode'
import { logOutAdmin } from '../redux/actions'
import { store } from '../store'
import { clearStorage } from './localstorage'

export const isTokenActivated = (token) => {
    if(!token) return false
    const decode = jwt_decode(token)
    return (decode?.exp > (Date.now() / 1000))
}

export const decodeToken = (token) => {
    if(!token) return false
    return jwt_decode(token)
}

export const handleLogOut = (navigate) => {
    clearStorage()
    store.dispatch(logOutAdmin({}))
    navigate && navigate('/login')
}

export const modifyWatt = (array) => {
    let obj = {}
    array?.forEach((val, index) => {
        obj[index] = val?.watt
    })
    return obj
}

export const modifyLimit = (array) => {
    let obj = {}
    array?.forEach((val, index) => {
        obj[index] = val?.limit
    })
    return obj
}

export const modifyPinsConfig = (array, pin_config) => {
    const cloneArray = array.map((value, index) => {
        return {
            ...value, watt: Number(pin_config['watt_config'][index]), limit: Number(pin_config['limit_config'][index])
        }
    })
    return cloneArray
}