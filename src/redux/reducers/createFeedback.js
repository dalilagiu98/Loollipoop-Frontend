import {
  CREATE_FEEDBACK,
  CREATE_FEEDBACK_FAILURE,
  CREATE_FEEDBACK_REQUEST,
} from "../actions/action";

const initialState = {
  feedbackCreated: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
};

const createFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEEDBACK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        isError: false,
      };
    case CREATE_FEEDBACK:
      return {
        ...state,
        feedbackCreated: [...state.feedbackCreated, action.payload],
        isLoaded: true,
        isError: false,
        isLoading: false,
      };
    case CREATE_FEEDBACK_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default createFeedbackReducer;
