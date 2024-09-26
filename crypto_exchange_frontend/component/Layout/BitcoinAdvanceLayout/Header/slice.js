import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  menu: false,
};

const menuReducer = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
  },
});
export default menuReducer.reducer;
export const { setMenu } = menuReducer.actions;
export const getStateMenu = (state) => state.menu;
