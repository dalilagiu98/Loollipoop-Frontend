import { CHANGE_STATE_ADVERTISING_BOOKING } from "../actions/action";

const initialState = {
  bookingChanged: [],
};

const changeStateAdvertisingBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE_ADVERTISING_BOOKING:
      return {
        ...state,
        bookingChanged: [...state.bookingChanged, action.payload],
      };
    default:
      return state;
  }
};

export default changeStateAdvertisingBookingReducer;
