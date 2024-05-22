import {
  CHANGE_PASSWORD_BY_EMAIL,
  CHANGE_PASSWORD_BY_USER_ID,
} from "../actions/action";

const initialState = {
  passwordChanged: [],
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_BY_USER_ID:
      return {
        ...state,
        passwordChanged: [],
      };
    case CHANGE_PASSWORD_BY_EMAIL:
      return {
        ...state,
        passwordChanged: [],
      };
    default:
      return state;
  }
};

export default changePasswordReducer;
