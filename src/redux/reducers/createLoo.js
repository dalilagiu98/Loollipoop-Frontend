import { CREATE_LOO } from "../actions/action";

const initialState = {
  myLoos: [],
};

const createLooReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LOO:
      return {
        ...state,
        myLoos: action.payload,
      };
    default:
      return state;
  }
};

export default createLooReducer;
