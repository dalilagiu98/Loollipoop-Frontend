import { GET_REVIEW_BY_LOO_ID, GET_REVIEW_BY_USER_ID } from "../actions/action";

const initialState = {
  reviewsByLooId: [],
  reviewsByUserId: [],
};

const getReviewByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW_BY_LOO_ID:
      return {
        ...state,
        reviewsByLooId: action.payload,
      };
    case GET_REVIEW_BY_USER_ID:
      return {
        ...state,
        reviewsByUserId: action.payload,
      };
    default:
      return state;
  }
};

export default getReviewByIdReducer;
