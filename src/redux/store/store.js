import createUserReducer from "../reducers/createUser";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginUserReducer from "../reducers/loginUser";
import getPersonalProfileReducer from "../reducers/getMyProfile";

const mainReducer = combineReducers({
  createUser: createUserReducer,
  loginUser: loginUserReducer,
  getPersonalProfile: getPersonalProfileReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
