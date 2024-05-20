import { GET_LOO_BOOKING } from "../actions/action";

const initialState = {
  looBooking: [],
};

const getLooBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOO_BOOKING:
      return {
        ...state,
        looBooking: action.payload,
      };
    default:
      return state;
  }
};

export default getLooBookingReducer;
