import {
  CHANGE_LOO_DETAILS,
  CHANGE_LOO_DETAILS_FAILURE,
  CHANGE_LOO_DETAILS_REQUEST,
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

  isLoadingDetails: false,
  isLoadedDetails: false,
  isErrorDetails: false,
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

    case CHANGE_LOO_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingDetails: true,
        isLoadedDetails: false,
        isErrorDetails: false,
      };

    case CHANGE_LOO_DETAILS:
      return {
        ...state,
        looFound: action.payload,
        isLoadingDetails: false,
        isLoadedDetails: true,
        isErrorDetails: false,
      };

    case CHANGE_LOO_DETAILS_FAILURE:
      return {
        ...state,
        isLoadingDetails: false,
        isLoadedDetails: false,
        isErrorDetails: true,
      };
    default:
      return state;
  }
};

export default getLooByIdReducer;
