import { CREATE_ADVERTISING } from "../actions/action";

const initalState = {
  advertisingGenereted: [],
};

const createAdvertisingReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_ADVERTISING:
      return {
        ...state,
        advertisingGenereted: action.payload,
      };
    default:
      return state;
  }
};

export default createAdvertisingReducer;
