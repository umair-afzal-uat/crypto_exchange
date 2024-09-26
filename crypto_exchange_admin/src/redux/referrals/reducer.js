import types from '../store/types';

const initialState = {
  data: null,
};

export const referrals = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_REFERRALS_DATA:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};
