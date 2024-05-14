import { GET_PERSONAL_PROFILE, LOGOUT_USER } from "../actions/action";

const initialState = {
  userLogged: [],
};

const getPersonalProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_PROFILE:
      return {
        ...state,
        userLogged: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        userLogged: [],
      };

    default:
      return state;
  }
};

export default getPersonalProfileReducer;
