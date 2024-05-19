import createUserReducer from "../reducers/createUser";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginUserReducer from "../reducers/loginUser";
import getPersonalProfileReducer from "../reducers/getMyProfile";
import createLooReducer from "../reducers/createLoo";
import getLocationReducer from "../reducers/getLocation";
import getPersonalLooReducer from "../reducers/getPersonalLoo";
import getLooByIdReducer from "../reducers/getLooById";
import getNearbyLooReducer from "../reducers/getNearbyLoo";
import getLooByAddressReducer from "../reducers/getLooByAddress";

const mainReducer = combineReducers({
  createUser: createUserReducer,
  loginUser: loginUserReducer,
  getPersonalProfile: getPersonalProfileReducer,
  createLoo: createLooReducer,
  getLocation: getLocationReducer,
  getPersonalLoo: getPersonalLooReducer,
  getLooById: getLooByIdReducer,
  getNearbyLoo: getNearbyLooReducer,
  getLooByAddress: getLooByAddressReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
