import api from './index'

export const getAdminCredentials = async(payload) => {
    const response = await api.post('/login', payload)
    return response
}

export const registerNewUser = async(payload) => {
    const response = await api.post('/register/user', payload)
    return response
}


export const updateUser = async(id, payload) => {
    const response = await api.put(`/update_user/${id}`, payload)
    return response
}

export const deleteUser = async(id) => {
    const response = await api.put(`/delete_user/${id}`)
    return response
}

export const getAllDevices = async() => {
    const response = await api.get('/getAllDevice')
    return response
}

export const getAllUsers = async() => {
    const response = await api.get('/getAllUsers')
    return response
}

export const getAllAvailableDevices = async() => {
    const response = await api.get('/availableDevices')
    return response
}