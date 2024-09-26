import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginState: "login",
  confirmEmail: null,
  dataLogin: {
    email: null,
    password: null,
    captcha: "0000",
    totp: "212321",
  },
};

const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    setStateLogin(state, action) {
      state.loginState = action.payload;
    },
    setConfirmEmail(state, action) {
      state.confirmEmail = action.payload;
    },
    setTotp(state, action) {
      state.dataLogin.totp = action.payload;
    },
    clearConfirmEmail(state) {
      state.confirmEmail = null;
    },
    setDataLogin(state, action) {
      state.dataLogin = { ...state.dataLogin, ...action.payload };
    },
    clearDataLogin(state) {
      state.dataLogin = initialState.dataLogin;
    },
  },
});
export default loginReducer.reducer;
export const getLoginState = (state) => state.login;
export const {
  setStateLogin,
  setConfirmEmail,
  clearConfirmEmail,
  setDataLogin,
  clearDataLogin,
  setTotp,
} = loginReducer.actions;
