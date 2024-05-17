import {
  CREATE_USER_FAILURE,
  CREATE_USER,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
} from "../actions/action";

const initialState = {
  id: "",
  isLoading: false,
  isLoaded: false,
  isError: false,
  errorMessage: "",
};

const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
        isLoaded: false,
        isError: false,
      };

    case CREATE_USER:
      return {
        ...state,
        id: action.payload,
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        isError: false,
        errorMessage: "",
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isError: true,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default createUserReducer;
