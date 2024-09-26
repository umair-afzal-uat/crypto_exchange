import { createSlice } from "@reduxjs/toolkit";
import { isLang } from "../../services/service";
import { i18n } from "../../services/i18n";
import Cookies from "js-cookie";
const initialState = {
  language: isLang(Cookies.get("next-i18next")) || {
    value: "en",
    label: "English",
  },
};
const languageReducer = createSlice({
  name: "Language",
  initialState,
  reducers: {
    setLanguage(state, action) {
      i18n.changeLanguage(action.payload.value);
      state.language = { ...state.language, ...action.payload };
    },
  },
});
export const getLanguageData = (state) => state.language;
export default languageReducer.reducer;
export const { setLanguage } = languageReducer.actions;
