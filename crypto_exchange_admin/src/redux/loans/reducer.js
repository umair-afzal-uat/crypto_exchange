import types from '../store/types';

const initialState = {
  data: null,
};
export const loans = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOANS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const user_loan = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER_LOAN_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
