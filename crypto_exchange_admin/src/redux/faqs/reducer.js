import types from '../store/types';

const initialState = {
  data: null,
};
export const faqs = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FAQS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export const addfaq = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FAQS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export const updatefaq = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FAQS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};


