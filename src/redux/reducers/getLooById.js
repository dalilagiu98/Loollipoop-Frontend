import { GET_LOO_BY_ID, GET_LOO_BY_ID_REQUEST } from "../actions/action";

const initialState = {
  looFound: [],
  isLoading: false,
};

const getLooByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOO_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LOO_BY_ID:
      return {
        ...state,
        looFound: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default getLooByIdReducer;
