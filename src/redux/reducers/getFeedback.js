import { GET_FEEDBACK } from "../actions/action";

const initialState = {
  feedback: [],
};

const getFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
      };
    default:
      return state;
  }
};

export default getFeedbackReducer;
