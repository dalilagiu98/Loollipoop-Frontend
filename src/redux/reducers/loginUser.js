import { LOGIN_USER } from "../actions/action";

const initialState = {
  token: "",
};

const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
