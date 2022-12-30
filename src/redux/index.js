import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import deviceReducer from "./reducers/deviceReducer";
import userReducer from "./reducers/userReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    devices: deviceReducer,
    users: userReducer
})