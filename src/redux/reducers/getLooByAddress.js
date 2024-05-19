import {
  GET_LOO_BY_ADDRESS,
  GET_LOO_BY_ADDRESS_FAILURE,
  GET_LOO_BY_ADDRESS_REQUEST,
} from "../actions/action";

const initialState = {
  looFound: [],
  isLoading: false,
  isLoaded: false,
  isError: true,
};

const getLooByAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOO_BY_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        isError: false,
      };
    case GET_LOO_BY_ADDRESS:
      return {
        ...state,
        looFound: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false,
      };
    case GET_LOO_BY_ADDRESS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default getLooByAddressReducer;
