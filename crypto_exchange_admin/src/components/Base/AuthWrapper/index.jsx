import axios from "axios";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "../../../routes";

export const AuthWrapper = ({ exact, path, component }) => {
  const isLogin = axios.defaults.headers.common.authorization;
  return isLogin ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to={routes.Auth.path} />
  );
};

export default AuthWrapper;
