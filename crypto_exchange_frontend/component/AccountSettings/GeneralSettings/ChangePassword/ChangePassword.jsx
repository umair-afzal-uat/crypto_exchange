import { Form, Formik } from "formik";
import { validationSchemaChangePasswordOnSettings } from "../../../../services/validation";
import PasswordInput from "../../../Base/PasswordInput/PasswordInput";
import React from "react";
import { useDispatch } from "react-redux";
import { settingsChangePassword } from "../../actions";

const ChangePassword = () => {
  const dispatch = useDispatch();
  return (
    <div className="content-block">
      <div className="content-block__inside">
        <div className="content-block__header">
          <h3 className="content-block__title content-block__title--medium">
            Change Password
          </h3>
        </div>
        <div className="content-block__main">
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={validationSchemaChangePasswordOnSettings}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              dispatch(settingsChangePassword(values));
              resetForm({});
            }}
          >
            {({ isValid, values, errors }) => (
              <Form className="form form--regular" action="">
                <PasswordInput
                  label="Current Password"
                  name="oldPassword"
                  placeholder="Enter your password"
                />
                <PasswordInput
                  label="New Password"
                  name="password"
                  placeholder="Enter your password"
                  notify={
                    <div className="input-notify">
                      <span className="notify__char">*</span>
                      <span className="input-notify__text">
                        New password must be at least 8 characters long, include
                        1 uppercase letter, and 1 number
                      </span>
                    </div>
                  }
                  errorMessage={
                    <div style={{ color: "red" }} className="input-notify">
                      <span className="notify__char">*</span>
                      <span
                        style={{ color: "red" }}
                        className="input-notify__text"
                      >
                        New password must be at least 8 characters long, include
                        1 uppercase letter, and 1 number
                      </span>
                    </div>
                  }
                />
                <PasswordInput
                  label="Confirm Password"
                  name="passwordConfirmation"
                  placeholder="Confirm your Password"
                />
                <button
                  className="button button--full-width"
                  type="submit"
                  disabled={
                    !isValid ||
                    !values.oldPassword ||
                    !values.password ||
                    !values.passwordConfirmation
                  }
                >
                  Change Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
