import { UPDATE_CASH_GUEST, UPDATE_CASH_HOST } from "../actions/action";

const initialState = {
  cashUpdated: [],
};

const updateCashReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CASH_HOST:
      return {
        ...state,
        cashUpdated: [...state.cashUpdated, action.payload],
      };
    case UPDATE_CASH_GUEST:
      return {
        ...state,
        cashUpdated: [...state.cashUpdated, action.payload],
      };
    default:
      return state;
  }
};

export default updateCashReducer;
