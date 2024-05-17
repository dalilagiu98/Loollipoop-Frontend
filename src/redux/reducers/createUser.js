import {
  CREATE_USER_FAILURE,
  CREATE_USER,
  CREATE_USER_REQUEST,
} from "../actions/action";

const initialState = {
  id: "",
  isLoading: false,
  isLoaded: false,
  isError: false,
};

const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_USER:
      return {
        ...state,
        id: action.payload,
        isLoaded: true,
        isLoading: false,
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default createUserReducer;
