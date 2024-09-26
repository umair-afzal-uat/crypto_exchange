import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import ReCAPTCHA from "../../ReCaptchaGoogle/ReCaptchaGoogle";
import ChekcIcon from "../../Base/icon/ChekcIcon";
import TextInput from "../../Base/TextInput/TextInput";
import PasswordInput from "../../Base/PasswordInput/PasswordInput";
import constants from "../../../services/constants";
import BtnAuth from "../../Base/Btn/BtnAuth/BtnAuth";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState, setDataLogin, setStateLogin } from "./slice";
import { useRouter } from "next/router";
import { confirmEmailUsers, LogInUsers } from "./actions";
import { validationSchemaLogIn } from "../../../services/validation";
const LogIn = () => {
  const router = useRouter();
  const [tokenCaptcha, setTokenCaptcha] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const { dataLogin } = useSelector(getLoginState);
  useEffect(() => {
    if (router?.query?.token) {
      dispatch(confirmEmailUsers({ token: router?.query?.token }));
    }
  }, []);
  const token = !!Cookies.get(constants.jwtToken);
  const isAuth = () => {
    if (token) {
      return rememberMe && token;
    }
    if (!token) {
      return !rememberMe && !token;
    }
  };
  const dispatch = useDispatch();
  return (
    <div className="auth">
      <h1 className="auth__title">Log In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          conditions: false,
        }}
        validationSchema={validationSchemaLogIn}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(
            LogInUsers({
              ...dataLogin,
              email: values.email.toLowerCase().trim(),
              password: values.password.trim(),
            })
          );
          dispatch(
            setDataLogin({ email: values.email, password: values.password })
          );
        }}
      >
        {({ isValid, values, errors }) => (
          <Form className="form auth__form">
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <div className="form__group">
              <div className="checkbox checkbox--margin-none form__group-item">
                <label className="checkbox__label">
                  <input
                    className="hidden"
                    type="checkbox"
                    checked={isAuth()}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <div className="checkbox__item">
                    <span className="checkbox__item-icon">
                      <ChekcIcon />
                    </span>
                  </div>
                  <p className="checkbox__text">Remember me</p>
                </label>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setStateLogin("forgotPass"))}
                className="link link--green form__link"
              >
                Forgot password?
              </button>
            </div>
            <div className="captcha">
              <ReCAPTCHA isToken={(value) => setTokenCaptcha(value)} />
            </div>
            <BtnAuth
              title="Log In"
              disabled={!isValid || !tokenCaptcha || !values.email}
            />
            <div className="form__footer">
              <Link href="/signUp">
                <a className="link link--green form__link">
                  Don’t have an account?
                </a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LogIn;
