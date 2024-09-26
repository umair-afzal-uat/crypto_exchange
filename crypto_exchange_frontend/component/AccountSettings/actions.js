import api from "../../services/api";
import { getUserData } from "./slice";
import notifications from "../Notifications/Notifications";
import { errorsMessage } from "../../services/service";
import moment from "moment";
export const getDataUsers = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.users.getIsUserInfo();
      data.date_birth = moment(data.date_birth).format("MM-DD-YYYY");
      if (status >= 200 && status < 300) {
        await dispatch(getUserData(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const changeDataUser = (dataUser) => {
  return async (dispatch) => {
    try {
      const { status } = await api.settings.changeDataUsers(dataUser);
      if (status >= 200 && status < 300) {
        await dispatch(getDataUsers());
        // notifications("success", "Success", "User data updated successfully ok");
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const changeEmailUser = (UserMail) => {
  return async (dispatch) => {
    try {
      const { status } = await api.settings.changeEmailUsers(UserMail);
      if (status >= 200 && status < 300) {
        notifications("success", "Success", "User email updatedxx successfully");
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};

export const settingsChangePassword = (dataUser) => {
  return async (dispatch) => {
    try {
      const { status } = await api.settings.changePasswordUsers(dataUser);
      if (status >= 200 && status < 300) {
        notifications(
          "success",
          "Success",
          "User password updated successfully"
        );
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};

export const enable2fa = (key) => {
  return async (dispatch) => {
    try {
      const { status } = await api.users.enable2fa({ totp: key });
      if (status >= 200 && status < 300) {
        dispatch(getDataUsers());
        notifications("success", "Success", "Enable Two-Factor Authentication");
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const disable2fa = (key) => {
  return async (dispatch) => {
    try {
      const { status } = await api.users.disable2fa({ totp: key });
      if (status >= 200 && status < 300) {
        dispatch(getDataUsers());
        notifications(
          "success",
          "Success",
          "Disable Two-Factor Authentication"
        );
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
