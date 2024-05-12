import { CREATE_USER } from "../actions/action";

const initialState = {
  id: "",
};

const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default createUserReducer;
