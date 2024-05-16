import createUserReducer from "../reducers/createUser";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginUserReducer from "../reducers/loginUser";
import getPersonalProfileReducer from "../reducers/getMyProfile";
import createLooReducer from "../reducers/createLoo";
import getLocationReducer from "../reducers/getLocation";
import getPersonalLooReducer from "../reducers/getPersonalLoo";

const mainReducer = combineReducers({
  createUser: createUserReducer,
  loginUser: loginUserReducer,
  getPersonalProfile: getPersonalProfileReducer,
  createLoo: createLooReducer,
  getLocation: getLocationReducer,
  getPersonalLoo: getPersonalLooReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
