import { CHANGE_STATE_LOO_BOOKING } from "../actions/action";

const initialState = {
  bookingChanged: [],
};

const changeStateLooBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE_LOO_BOOKING:
      return {
        ...state,
        bookingChanged: [...state.bookingChanged, action.payload],
      };
    default:
      return state;
  }
};

export default changeStateLooBookingReducer;
