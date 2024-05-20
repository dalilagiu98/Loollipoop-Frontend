import { REJECT_BOOKING } from "../actions/action";

const initialState = {
  rejectedBooking: [],
};

const rejectBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case REJECT_BOOKING:
      return {
        ...state,
        rejectedBooking: [...state.rejectedBooking, action.payload],
      };
    default:
      return state;
  }
};

export default rejectBookingReducer;
