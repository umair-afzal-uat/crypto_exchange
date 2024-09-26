import React, { useState } from "react";
import ReCAPTCHA from "../../ReCaptchaGoogle/ReCaptchaGoogle";
import TextInput from "../../Base/TextInput/TextInput";
import BtnAuth from "../../Base/Btn/BtnAuth/BtnAuth";
import { Form, Formik } from "formik";
import { validationSchemaResetPassword } from "../../../services/validation";
import { useDispatch } from "react-redux";
import { isConfirmPasswordUsers } from "../logIn/actions";
const ForgotPass = () => {
  const dispatch = useDispatch();
  const [tokenCaptcha, setTokenCaptcha] = useState(null);
  return (
    <div className="auth">
      <h1 className="auth__title">Reset Your Password</h1>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchemaResetPassword}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await dispatch(isConfirmPasswordUsers(values));
        }}
      >
        {({ isValid, values }) => (
          <Form className="form auth__form">
            <p className="form__text">
              Enter your account email address to receive instructions on how to
              reset your password.
            </p>
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
            <div className="captcha">
              <ReCAPTCHA isToken={(value) => setTokenCaptcha(value)} />
            </div>
            <BtnAuth
              title="Reset Password"
              disabled={!isValid || !tokenCaptcha || !values.email}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ForgotPass;
