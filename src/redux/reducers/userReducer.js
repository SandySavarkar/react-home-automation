import { constant } from "../../constant";

const initialState = {
    all_users: []
}

const userReducer = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case constant.GET_ALL_USERS:
            return {
                ...state, all_users: payload
            }
        default: return state
    }
}

export default userReducer