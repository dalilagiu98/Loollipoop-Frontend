import { GET_MY_LOO } from "../actions/action";

const initialState = {
  myLoos: [],
};

const getPersonalLooReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_LOO:
      return {
        ...state,
        myLoos: action.payload,
      };
    default:
      return state;
  }
};

export default getPersonalLooReducer;
