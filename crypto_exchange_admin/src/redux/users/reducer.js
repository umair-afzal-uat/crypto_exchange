import types from '../store/types';

export const users = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USERS_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const waitList = (state = {}, action) => {
  switch (action.type) {
    case types.SET_WAITLIST_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  queued: false,
};

export const isQueued = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QR_DATA:
      return {
        ...state,
        queued: action.payload,
      };
    default:
      return state;
  }
};
