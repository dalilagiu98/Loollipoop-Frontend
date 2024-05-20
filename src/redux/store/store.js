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
import getMyBookingsReducer from "../reducers/getMyBookings";
import createBookingReducer from "../reducers/createBooking";
import getLooBookingReducer from "../reducers/getLooBooking";
import acceptBookingReducer from "../reducers/acceptBooking";
import rejectBookingReducer from "../reducers/rejectBooking";
import createUserReviewReducer from "../reducers/createUserReview";
import changeStateUserBooking from "../reducers/changeStateUserBooking";

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
  getMyBookings: getMyBookingsReducer,
  createBooking: createBookingReducer,
  getLooBooking: getLooBookingReducer,
  acceptBooking: acceptBookingReducer,
  rejectBooking: rejectBookingReducer,
  createUserReview: createUserReviewReducer,
  changeStateUserBooking: changeStateUserBooking,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
