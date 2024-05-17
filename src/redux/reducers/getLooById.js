import {
  CHANGE_LOO_IMAGE,
  CHANGE_LOO_IMAGE_FAILURE,
  CHANGE_LOO_IMAGE_REQUEST,
  CHANGE_LOO_STATE,
  GET_LOO_BY_ID,
  GET_LOO_BY_ID_REQUEST,
} from "../actions/action";

const initialState = {
  looFound: [],
  isLoading: false,
  isLoadingImage: false,
  isLoadedImage: false,
  isErrorImage: false,
  errorMessageImage: "",
};

const getLooByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOO_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LOO_BY_ID:
      return {
        ...state,
        looFound: action.payload,
        isLoading: false,
      };
    case CHANGE_LOO_STATE:
      return {
        ...state,
        looFound: action.payload,
      };
    case CHANGE_LOO_IMAGE_REQUEST:
      return {
        ...state,
        isLoadingImage: true,
        isLoaded: false,
        isErrorImage: false,
        errorMessageImage: "",
      };
    case CHANGE_LOO_IMAGE:
      return {
        ...state,
        isLoadingImage: false,
        isLoadedImage: true,
        looFound: action.payload,
      };
    case CHANGE_LOO_IMAGE_FAILURE:
      return {
        ...state,
        isLoadingImage: false,
        isErrorImage: true,
        errorMessageImage: action.payload.message,
      };
    default:
      return state;
  }
};

export default getLooByIdReducer;
