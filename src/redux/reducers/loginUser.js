import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
} from "../actions/action";

const initialState = {
  token: "",
  isLoading: false,
  isLoaded: false,
  isError: false,
  errorMessage: "",
};

const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isError: true,
        errorMessage: action.payload.message,
      };

    case LOGOUT_USER:
      return {
        ...state,
        token: "",
        isLoading: false,
        isLoaded: false,
        isError: false,
        errorMessage: "",
      };

    default:
      return state;
  }
};

export default loginUserReducer;
