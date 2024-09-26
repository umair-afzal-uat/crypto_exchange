import types from '../store/types';
const initialState = {
  wallet: null,
  transactions: null,
};
export const hotWallet = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_HOT_WALLET_DATA:
      return {
        ...state,
        wallet: action.payload,
      };
    case types.SET_HISTORY_TRANSACTIONS_DATA:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};