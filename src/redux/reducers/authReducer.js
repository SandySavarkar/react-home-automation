import { constant } from "../../constant";

const initialState = {}

const authReducer = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case constant.GET_ADMIN_CREDENTIALS:
            return {
                ...state, ...payload
            }
        case constant.LOGGED_OUT:
            return {
                ...payload
            }
        default: return state
    }
}

export default authReducer