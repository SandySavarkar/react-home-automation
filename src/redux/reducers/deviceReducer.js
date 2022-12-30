import { constant } from "../../constant";

const initialState = {
    all_devices: []
}

const deviceReducer = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case constant.GET_ALL_DEVICES:
            return {
                ...state, all_devices: payload
            }
        default: return state
    }
}

export default deviceReducer