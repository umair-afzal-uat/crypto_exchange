import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../component/Auth/logIn/slice";
import languageReducer from "../component/language/slice";
import paymentReducer from "../component/BitcoinAdvance/BABase/slice";
import menuReducer from "../component/Layout/BitcoinAdvanceLayout/Header/slice";
import modalReducer from "../component/Base/Modal/slice";
import sideBarReducer from "../component/Layout/BitcoinAdvanceLayout/Sidebar/slice";
import loansReducer from "../component/BitcoinAdvance/MyBA/slice";
import settingUserReducer from "../component/AccountSettings/slice";
import userReducer from "../component/Auth/SignUp/slice";
import referralReducer from "../component/BitcoinAdvance/AffiliateProgram/slice";
import faqReducer from "../component/Faq/slice";
const rootReducer = combineReducers({
  users: userReducer,
  login: loginReducer,
  language: languageReducer,
  payment: paymentReducer,
  menu: menuReducer,
  modal: modalReducer,
  menuSidebar: sideBarReducer,
  settingUser: settingUserReducer,
  loans: loansReducer,
  referral: referralReducer,
  faqs: faqReducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
export default store;