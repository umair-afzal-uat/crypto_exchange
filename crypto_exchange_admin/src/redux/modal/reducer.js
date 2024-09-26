import types from '../store/types';
const init = {
  modal: '',
  modalData: null,
  succes: false,
  error: false,
};
export const modal = (state = init, action) => {
  switch (action.type) {
    case types.HANDLE_MODAL:
      return {
        ...state,
        modal: action.payload.modal,
        modalData: action.payload?.modalData,
      };
    default:
      return state;
  }
};
