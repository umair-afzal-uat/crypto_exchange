import api from "../../../services/api";
import constants from "../../../services/constants";
import Router from "next/router";
import Cookies from "js-cookie";
import { clearDataLogin, setStateLogin } from "./slice";
import { handleModal } from "../../Base/Modal/slice";
import { clearDataPayment } from "../../BitcoinAdvance/BABase/slice";
import { clearLoansList } from "../../BitcoinAdvance/MyBA/slice";
import { clearUser } from "../../AccountSettings/slice";
import { clearReferralList } from "../../BitcoinAdvance/AffiliateProgram/slice";
import axios from "axios";
import { errorsMessage, textError } from "../../../services/service";
import notifications from "../../Notifications/Notifications";

export const LogInUsers = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(handleModal({ modal: "Preloader", modalData: {} }));
      Cookies.remove(constants.jwtToken);
      const { data, status } = await api.logIn.logInUser(dataUser);
      if (status >= 200 && status < 300) {
        Cookies.set(constants.jwtToken, data?.token);
        Router.push(`/bitcoinAdvance`);
        localStorage.setItem("tokken",Math.random().toString(36).slice(2))
        dispatch(handleModal({ modal: "", modalData: {} }));
        dispatch(refreshTokenUsers());
      }
    } catch (error) {
      const { response } = error;
      if (
        response?.status === 403 &&
        response.data.errors.join() === "email_not_confirmed"
      ) {
        dispatch(
          handleModal({
            modal: "ErrorAuth",
            modalData: { message: "Email not confirmed" },
          })
        );
        return;
      }
      if (
        response?.status === 403 &&
        response.data.errors.join() === "user_blocked"
      ) {
        dispatch(
          handleModal({
            modal: "ErrorAuth",
            modalData: {
              delay: 50000,
              message:
                "Your account is blocked by admin. \n" +
                "Please contact our support team",
            },
          })
        );
        return;
      }
      if (
        response?.status === 403 &&
        response.data.errors.join() === "need_approve_auth_from_email"
      ) {
        dispatch(handleModal({ modal: "ConfirmCod", modalData: {} }));
        return;
      }
      if (
        response?.status === 400 &&
        response.data.errors.join() === "invalid_totp_code"
      ) {
        dispatch(handleModal({ modal: "Code2FA", modalData: {} }));
        return;
      }
      if (
        response?.status === 422 ||
        (response?.status === 400 &&
          response.data.errors.join() === "invalid_credentials")
      ) {
        dispatch(
          handleModal({
            modal: "ErrorAuth",
            modalData: {
              delay: 10000,
              message:
                "You entered incorrect data or user with such data does not exist",
            },
          })
        );
        return;
      }
      dispatch(
        handleModal({
          modal: "",
          modalData: {},
        })
      );
    }
  };
};

export const LogOutUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(handleModal({ modal: "Preloader", modalData: {} }));
      const { status } = await api.users.logOutUsers();
      if (status >= 200 && status < 300) {
        Router.push(`/`);
        localStorage.removeItem("tokken")
      }
    } catch (error) {
      errorsMessage(error);
    } finally {
      Cookies.remove(constants.jwtToken);
      dispatch(clearDataPayment());
      dispatch(clearLoansList());
      dispatch(clearUser());
      dispatch(clearReferralList());
      dispatch(handleModal({ modal: "", modalData: {} }));
    }
  };
};

export const logInConfirmUsers = (dataUser, dataLogIn) => {
  return async (dispatch) => {
    try {
      dispatch(handleModal({ modal: "Preloader", modalData: {} }));
      Cookies.remove(constants.jwtToken);
      const { status } = await api.logIn.logInConfirm(dataUser);
      if (status >= 200 && status < 300) {
        dispatch(LogInUsers(dataLogIn));
      }
    } catch (error) {
      Router.push(`/logIn`);
      errorsMessage(error);
    } finally {
      dispatch(handleModal({ modal: "", modalData: {} }));
      dispatch(clearDataLogin());
    }
  };
};

export const isConfirmPasswordUsers = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(handleModal({ modal: "Preloader", modalData: {} }));
      const { status } = await api.forgotPassword.isConfirmPasswordUser(
        dataUser
      );
      if (status >= 200 && status < 300) {
        dispatch(setStateLogin("forgotMess"));
      }
    } catch (error) {
      notifications(
        "danger",
        "Errors",
        error?.response?.data?.errors?.email[0]?.replace(/_/g, " ") ||
          "Server error data!"
      );
    } finally {
      dispatch(handleModal({ modal: "", modalData: {} }));
    }
  };
};

export const confirmPasswordUsers = (dataUser) => {
  return async (dispatch) => {
    try {
      const { status } = await api.forgotPassword.confirmPasswordUsers(
        dataUser
      );
      if (status >= 200 && status < 300) {
        Router.push(`/logIn`);
      }
    } catch (error) {
      errorsMessage(error);
    } finally {
      dispatch(setStateLogin("login"));
    }
  };
};
export const confirmEmailUsers = (dataUser) => {
  return async (dispatch) => {
    try {
      const { status } = await api.logIn.emailConfirm(dataUser);
      if (status >= 200 && status < 300) {
        Router.push(`/logIn`);
        
      }
    } catch (error) {
      errorsMessage(error);
    } finally {
      dispatch(setStateLogin("login"));
    }
  };
};

export const refreshTokenUsers = () => {
  return async (dispatch) => {
    try {
      const timer = setInterval(async () => {
        if (Cookies.get(constants.jwtToken)) {
          const { status, data } = await api.logIn.getRefreshToken();
          if (status >= 200 && status < 300) {
            axios.defaults.headers.common.authorization = `Bearer ${data?.token}`;
            Cookies.set(constants.jwtToken, data?.token);
          } else {
            return clearInterval(timer);
          }
        } else {
          return clearInterval(timer);
        }
      }, 1000 * 60 * 10);
    } catch (error) {
      Cookies.remove(constants.jwtToken);
    }
  };
};
