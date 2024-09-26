import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: "",
  modalData: null,
};

const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleModal(state, action) {
      state.modal = action.payload?.modal;
      state.modalData = action.payload?.modalData;
    },
  },
});

export default modalReducer.reducer;
export const getModalState = (state) => state.modal;
export const { handleModal } = modalReducer.actions;
