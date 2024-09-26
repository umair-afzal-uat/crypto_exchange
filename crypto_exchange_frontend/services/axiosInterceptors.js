import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/dist/client/router";
import constants from "./constants";
import { clearJWT, setAuthorizationToken } from "./service";
import notifications from "../component/Notifications/Notifications";

export const axiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );
  axios.interceptors.response.use(
    (response) => {
      const jwtToken = Cookies.get(constants.jwtToken);
      if (jwtToken) {
        setAuthorizationToken(jwtToken);
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        clearJWT();
        Cookies.remove(constants.jwtToken);
        Router.push("/");
        notifications("danger", "Errors", "Will not authorize");
        return;
      }
      return Promise.reject(error);
    }
  );
};
