import { GET_NEARBY_LOO } from "../actions/action";

const initialState = {
  loosNearby: [],
};

const getNearbyLooReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEARBY_LOO:
      return {
        ...state,
        loosNearby: action.payload,
      };
    default:
      return state;
  }
};

export default getNearbyLooReducer;
