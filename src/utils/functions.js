import jwt_decode from 'jwt-decode'
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

export const handleLogOut = () => {
    clearStorage()
}