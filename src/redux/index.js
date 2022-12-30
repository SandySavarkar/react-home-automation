import { combineReducers } from "redux";
import authReducer from "./reducers/reducer";

export const rootReducer = combineReducers({
    auth: authReducer
})