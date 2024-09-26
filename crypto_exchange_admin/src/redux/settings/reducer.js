import types from '../../redux/store/types';
const initialState = {
  qrData: null,
};
export const settings = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QR_DATA:
      return {
        ...state,
        qrData: action.payload,
      };
    default:
      return state;
  }
};