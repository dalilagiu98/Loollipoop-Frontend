import { CREATE_BOOKING } from "../actions/action";

const initalState = {
  bookingCreated: [],
};

const createBookingReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_BOOKING:
      return {
        ...state,
        bookingCreated: [...state.bookingCreated, action.payload],
      };
    default:
      return state;
  }
};

export default createBookingReducer;
