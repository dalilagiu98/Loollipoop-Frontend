import { CREATE_USER_REVIEW } from "../actions/action";

const initalState = {
  userReviewSent: [],
};

const createUserReviewReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_USER_REVIEW:
      return {
        ...state,
        userReviewSent: [...state.userReviewSent, action.payload],
      };
    default:
      return state;
  }
};

export default createUserReviewReducer;
