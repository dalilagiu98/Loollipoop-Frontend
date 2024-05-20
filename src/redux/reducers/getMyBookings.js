import { GET_MY_BOOKINGS } from "../actions/action";

const initalState = {
  myBookings: [],
};

const getMyBookingsReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_MY_BOOKINGS:
      return {
        ...state,
        myBookings: action.payload,
      };
    default:
      return state;
  }
};

export default getMyBookingsReducer;
