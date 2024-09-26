import types from '../../redux/store/types';
const initialState = {
  data: {},
  isAuth: false,
  isLoading: false,
};
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOAD_FINISH:
      return {
        ...state,
        isLoading: false,
      };
    case types.SET_AUTH_DATA:
      return {
        data: action.payload,
        isAuth: true,
        isLoading: false,
      };
    case types.USER_LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
