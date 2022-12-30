import api from './index'

export const getAdminCredentials = async(payload) => {
    const response = await api.post('/login', payload)
    return response
}

export const registerNewUser = async(payload) => {
    const response = await api.post('/register/user', payload)
    return response
}

export const getAllUsers = async() => {
    const response = await api.get('/get_users')
    return response
}

export const updateUser = async(id, payload) => {
    const response = await api.put(`/update_user/${id}`, payload)
    return response
}

export const deleteUser = async(id) => {
    const response = await api.delete(`/delete_user/${id}`)
    return response
}