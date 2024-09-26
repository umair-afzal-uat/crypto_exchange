import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
  clearConfirmEmail,
  clearDataLogin,
  setConfirmEmail,
  setDataLogin,
  setStateLogin,
  setTotp,
} from "../component/Auth/logIn/slice";
import { clearUser, setUser } from "../component/Auth/SignUp/slice";

const actionCreator = {
  setStateLogin,
  setConfirmEmail,
  clearConfirmEmail,
  setDataLogin,
  clearDataLogin,
  setTotp,
  setUser,
  clearUser,
};

export const useActions = () => {
  const dispatch = useDispatch;
  return bindActionCreators(
    {
      ...actionCreator,
    },
    dispatch
  );
};
