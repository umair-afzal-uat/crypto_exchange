import types from '../store/types';

const initialState = {
  data: null,
};

export const withdrawals = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_WITHDRAWALS_DATA:
      return {
        ...state,
        data: payload,
      };
    case types.CHANGE_WITHDRAWALS_DATA:
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
