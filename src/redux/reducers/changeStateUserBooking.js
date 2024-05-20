import { CHANGE_STATE_USER_BOOKING } from "../actions/action";

const initialState = {
  bookingChanged: [],
};

const changeStateUserBooking = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE_USER_BOOKING:
      return {
        ...state,
        bookingChanged: [...state.bookingChanged, action.payload],
      };
    default:
      return state;
  }
};

export default changeStateUserBooking;
