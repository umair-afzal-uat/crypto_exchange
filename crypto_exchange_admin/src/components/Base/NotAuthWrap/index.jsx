import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import routes from "../../../routes";

const NotAuthWrap = ({ exact, path, component }) => {
  const isLogin = axios.defaults.headers.common.authorization;
  return isLogin ? (
    <Redirect to={routes.UserManagement.path} />
  ) : (
    <Route exact={exact} path={path} component={component} />
  );
};

export default NotAuthWrap;
