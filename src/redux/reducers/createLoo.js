import {
  CREATE_LOO,
  CREATE_LOO_FAILURE,
  CREATE_LOO_REQUEST,
  CREATE_LOO_SUCCESS,
  RESET_LOADED,
} from "../actions/action";

const initialState = {
  newLoo: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
};

const createLooReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LOO_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoaded: false,
      };

    case CREATE_LOO:
      return {
        ...state,
        newLoo: action.payload,
      };
    case CREATE_LOO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    case CREATE_LOO_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case RESET_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    default:
      return state;
  }
};

export default createLooReducer;
