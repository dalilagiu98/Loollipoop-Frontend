import { ACCEPT_BOOKING } from "../actions/action";

const initalState = {
  bookingAccepted: [],
};

const acceptBookingReducer = (state = initalState, action) => {
  switch (action.type) {
    case ACCEPT_BOOKING:
      return {
        ...state,
        bookingAccepted: [...state.bookingAccepted, action.payload],
      };
    default:
      return state;
  }
};

export default acceptBookingReducer;
