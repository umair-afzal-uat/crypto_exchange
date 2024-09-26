import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    invite_key: "",
    address: "",
    blocked: "",
    date_birth: "",
    email_confirmed: "",
    email_verified_at: "",
    last_login: "",
    last_login_confirmation: "",
    deleted_at: "",
    created_at: "",
    updated_at: "",
    google2fa_enabled: "",
    wallet_address: "",
    debit_card_expiry_date:""
  },
};
const settingUserReducer = createSlice({
  name: "settingUser",
  initialState,
  reducers: {
    getUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    clearUser(state) {
      state.user = initialState.user;
    },
  },
});
export default settingUserReducer.reducer;
export const getDataSettingUser = (state) => state.settingUser;
export const { getUserData, clearUser } = settingUserReducer.actions;
