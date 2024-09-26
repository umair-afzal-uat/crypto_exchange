import React, { useEffect } from "react";
import Cookies from "js-cookie";
import PasswordInput from "../../Base/PasswordInput/PasswordInput";
import constants from "../../../services/constants";
import BtnAuth from "../../Base/Btn/BtnAuth/BtnAuth";
import { useDispatch } from "react-redux";
import { confirmPasswordUsers } from "../logIn/actions";
import { validationSchemaChangePassword } from "../../../services/validation";
import { Form, Formik } from "formik";
import { setStateLogin } from "../logIn/slice";
import { useRouter } from "next/router";
const ChangePass = ({ resetToken }) => {
  const router = useRouter();
  useEffect(() => {
    if (!router?.query?.password_reset) {
      dispatch(setStateLogin("login"));
    }
  }, []);
  const dispatch = useDispatch();
  return (
    <div className="auth">
      <h1 className="auth__title">Change Password </h1>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchemaChangePassword}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(
            confirmPasswordUsers({
              token: resetToken,
              password: values.password,
              password_confirmation: values.password,
            })
          );
        }}
      >
        {({ isValid, values }) => (
          <Form className="form auth__form">
            <PasswordInput
              label="New password"
              name="password"
              placeholder="Confirm your Password"
              notify={
                <div className="input-notify">
                  <span className="notify__char">*</span>
                  <span className="input-notify__text">
                    New password must be at least 8 characters long, include 1
                    uppercase letter, and 1 number
                  </span>
                </div>
              }
              errorMessage={
                <div className="input__notification">
                  <p>
                    Password must be at least 8 characters long, include 1
                    uppercase letter, and 1 number
                  </p>
                </div>
              }
            />
            <PasswordInput
              label="Confirm password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              notify={
                <div className="input-notify">
                  <span className="notify__char">*</span>
                  <span className="input-notify__text">
                    Validate that inputs in 'New Password' and 'Confirm
                    Password' data fields match
                  </span>
                </div>
              }
              errorMessage={
                <div className="input__notification">
                  <p>Password do not match</p>
                </div>
              }
            />
            <BtnAuth
              title="Change Password"
              disabled={!isValid || !values.password || !values.confirmPassword}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ChangePass;
