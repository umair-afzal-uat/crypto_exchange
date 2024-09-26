import types from '../store/types';
const initialState = {
  data: null,
};
export const fee = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_FEE_DATA:
      return {
        ...state,
        data: {
          first: payload.settings.periods.splice(0, 6),
          second: payload.settings.periods,
        },
      };
    default:
      return state;
  }
};
