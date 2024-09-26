import types from '../store/types';

const initialState = {
  data: null,
};
export const transactions = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_TRANSACTIONS_DATA:
      return {
        ...state,
        data: payload,
      };
    case types.GET_MISSED_PAYMENT_DATA:
      return {
        ...state,
        data: payload,
      };
    case types.GET_LOAN_DATA:
      return {
        ...state,
        data: payload,
      };
    case types.SET_PAYMENT_DATA:
      return {
        ...state,
        data: payload,
      };
    case types.CHANGE_TRANSACTIONS_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          data: state?.data?.data?.map(elem => {
            if (elem.id === payload.id) {
              return payload;
            }
            return elem;
          }),
        },
      };
    default:
      return state;
  }
};
