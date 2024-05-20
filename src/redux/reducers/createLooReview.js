import { CREATE_LOO_REVIEW } from "../actions/action";

const initalState = {
  userReviewSent: [],
};

const createLooReviewReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_LOO_REVIEW:
      return {
        ...state,
        userReviewSent: [...state.userReviewSent, action.payload],
      };
    default:
      return state;
  }
};

export default createLooReviewReducer;
