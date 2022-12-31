import axios from 'axios'
import { handleLogOut } from '../utils/functions'
import { getDataFromLocal } from '../utils/localstorage'


const instance = axios.create({
    baseURL: 'http://192.168.1.155:8090/api'
})

instance.interceptors.request.use(
    async(config) => {
        const token = getDataFromLocal('token')
        config.headers['Accept'] = "application/json"
        config.headers['token'] = token
        config.headers['Content-Type'] = "application/json"
        config.headers['Access-Control-Allow-Origin'] = "*"
        return config
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if([401, 402, 403].includes(error.response.status)){
            handleLogOut()
        }
        return Promise.reject(error)
    }
)

export default instance