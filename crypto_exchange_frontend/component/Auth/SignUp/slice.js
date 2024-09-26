import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    date_birth: "",
    password: "",
  },
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    clearUser(state) {
      state = initialState;
    },
  },
});
export default userReducer.reducer;
export const { setUser, clearUser } = userReducer.actions;
