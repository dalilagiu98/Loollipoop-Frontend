import { GET_LOCATION } from "../actions/action";

const initialState = {
  locationGetted: [],
};

const getLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        locationGetted: action.payload.data,
      };
    default:
      return state;
  }
};

export default getLocationReducer;
