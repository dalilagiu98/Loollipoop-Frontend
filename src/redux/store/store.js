import createUserReducer from "../reducers/createUser";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginUserReducer from "../reducers/loginUser";

const mainReducer = combineReducers({
  createUser: createUserReducer,
  loginUser: loginUserReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
