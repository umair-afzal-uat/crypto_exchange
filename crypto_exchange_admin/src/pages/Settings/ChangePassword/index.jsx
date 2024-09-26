import { useState } from "react";
import { useDispatch } from "react-redux";
import { passwordValid } from "../../../helpers/validation";
import { changePassword } from "../../../redux/settings/actions";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [isShowOldPass, setIsShowOldPass] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const [state, setState] = useState({
    oldPassword: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState({});
  const handleSetState = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const validation = () => {
    const errors = {};

    if (!state.oldPassword?.trim()?.length) {
      errors.oldPassword = "Required";
    } else if (!passwordValid(state.oldPassword)) {
      errors.oldPassword =
        "Old password must be at least 8 characters long, include 1 capital letter, 1 small letter, one Number and 1 Special symbol";
    }

    if (!state.password?.trim()?.length) {
      errors.password = "Required";
    } else if (!passwordValid(state.password)) {
      errors.password =
        "Password must be at least 8 characters long, include 1 capital letter, 1 small letter, one Number and 1 Special symbol";
    }

    if (!state.passwordConfirmation?.trim()?.length) {
      errors.passwordConfirmation = "Required";
    } else if (!passwordValid(state.passwordConfirmation)) {
      errors.passwordConfirmation =
        "Password must be at least 8 characters long, include 1 capital letter, 1 small letter, one Number and 1 Special symbol";
    }
    if (
      state.password &&
      state.passwordConfirmation &&
      state.password !== state.passwordConfirmation
    ) {
      errors.passwordConfirmation = "Password mismatch";
    }

    setError(errors);
    if (Object.keys(errors)?.length) {
      return false;
    } else {
      return true;
    }
  };

  const send = () => {
    if (!validation()) return;

    dispatch(changePassword(state));
  };
  return (
    <div className="forms-block">
      <div className="form form--settings">
        <p className="block-title">Change password</p>
        <div className="form__content">
          <div className={`input ${error.oldPassword && "input--error"}`}>
            <label>
              <p className="input__name">Old password</p>
              <div className="input-wrapper">
                <input
                  className="input-item input-item--right-icon"
                  type={isShowOldPass ? "text" : "password"}
                  name="oldPassword"
                  value={state.oldPassword}
                  placeholder="Old Password"
                  onChange={handleSetState}
                />
                <button
                  className="show-pass"
                  onClick={() => setIsShowOldPass(!isShowOldPass)}
                >
                  <svg
                    className="password-type stroke"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-darkreader-inline-fill=""
                    style={{ "--darkreader-inline-fill": "none" }}
                  >
                    <path
                      d="M14.53 9.46992L9.47001 14.5299C8.82001 13.8799 8.42001 12.9899 8.42001 11.9999C8.42001 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.47 3.72998 5.18 5.80998 2.89 9.40998C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M8.42001 19.5299C9.56001 20.0099 10.77 20.2699 12 20.2699C15.53 20.2699 18.82 18.1899 21.11 14.5899C22.01 13.1799 22.01 10.8099 21.11 9.39993C20.78 8.87993 20.42 8.38993 20.05 7.92993"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M15.51 12.7C15.25 14.11 14.1 15.26 12.69 15.52"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M9.47 14.53L2 22"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M22 2L14.53 9.47"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                  </svg>
                  <svg
                    className="text-type fill"
                    width="15"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-darkreader-inline-fill=""
                    style={{ "--darkreader-inline-fill": "none" }}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5001 4.018C7.1449 4.018 6.80425 4.1591 6.55309 4.41026C6.30192 4.66143 6.16082 5.00208 6.16082 5.35728C6.16082 5.71248 6.30192 6.05314 6.55309 6.3043C6.80425 6.55547 7.1449 6.69657 7.5001 6.69657C7.85531 6.69657 8.19596 6.55547 8.44712 6.3043C8.69829 6.05314 8.83939 5.71248 8.83939 5.35728C8.83939 5.00208 8.69829 4.66143 8.44712 4.41026C8.19596 4.1591 7.85531 4.018 7.5001 4.018ZM5.60607 3.46325C6.1084 2.96092 6.7897 2.67871 7.5001 2.67871C8.21051 2.67871 8.89181 2.96092 9.39414 3.46325C9.89647 3.96558 10.1787 4.64688 10.1787 5.35728C10.1787 6.06768 9.89647 6.74899 9.39414 7.25132C8.89181 7.75365 8.21051 8.03585 7.5001 8.03585C6.7897 8.03585 6.1084 7.75365 5.60607 7.25132C5.10374 6.74899 4.82153 6.06768 4.82153 5.35728C4.82153 4.64688 5.10374 3.96558 5.60607 3.46325Z"
                      fill="#969696"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "#f9eddb" }}
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 5.35714V5.55777C0.999008 8.54564 3.97125 10.7143 7.48362 10.7143C10.9967 10.7143 13.9683 8.5456 14.9672 5.55777C15.0109 5.42716 15.0109 5.28712 14.9672 5.15652C13.9683 2.16868 10.9967 0 7.48362 0C3.97125 0 0.999008 2.16864 0 5.15652V5.35714ZM1.43174 5.35714C2.31265 7.69849 4.69099 9.375 7.48362 9.375C10.2769 9.375 12.6546 7.69852 13.5355 5.35714C12.6546 3.01576 10.2769 1.33929 7.48362 1.33929C4.69099 1.33929 2.31265 3.0158 1.43174 5.35714Z"
                      fill="#969696"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "#f9eddb" }}
                    ></path>
                  </svg>
                </button>
              </div>
              {error.oldPassword && (
                <p className="input__notification">{error.oldPassword}</p>
              )}
            </label>
          </div>

          <div className={`input ${error.password ? "input--error" : ""}`}>
            <label>
              <p className="input__name">New password</p>
              <div className="input-wrapper">
                <input
                  className="input-item input-item--right-icon"
                  type={isShowPass ? "text" : "password"}
                  name="password"
                  value={state.password}
                  placeholder="New Password"
                  onChange={handleSetState}
                />
                <button
                  className="show-pass"
                  onClick={() => setIsShowPass(!isShowPass)}
                >
                  <svg
                    className="password-type stroke"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-darkreader-inline-fill=""
                    style={{ "--darkreader-inline-fill": "none" }}
                  >
                    <path
                      d="M14.53 9.46992L9.47001 14.5299C8.82001 13.8799 8.42001 12.9899 8.42001 11.9999C8.42001 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.47 3.72998 5.18 5.80998 2.89 9.40998C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M8.42001 19.5299C9.56001 20.0099 10.77 20.2699 12 20.2699C15.53 20.2699 18.82 18.1899 21.11 14.5899C22.01 13.1799 22.01 10.8099 21.11 9.39993C20.78 8.87993 20.42 8.38993 20.05 7.92993"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M15.51 12.7C15.25 14.11 14.1 15.26 12.69 15.52"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M9.47 14.53L2 22"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M22 2L14.53 9.47"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                  </svg>
                  <svg
                    className="text-type fill"
                    width="15"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-darkreader-inline-fill=""
                    style={{ "--darkreader-inline-fill": "none" }}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5001 4.018C7.1449 4.018 6.80425 4.1591 6.55309 4.41026C6.30192 4.66143 6.16082 5.00208 6.16082 5.35728C6.16082 5.71248 6.30192 6.05314 6.55309 6.3043C6.80425 6.55547 7.1449 6.69657 7.5001 6.69657C7.85531 6.69657 8.19596 6.55547 8.44712 6.3043C8.69829 6.05314 8.83939 5.71248 8.83939 5.35728C8.83939 5.00208 8.69829 4.66143 8.44712 4.41026C8.19596 4.1591 7.85531 4.018 7.5001 4.018ZM5.60607 3.46325C6.1084 2.96092 6.7897 2.67871 7.5001 2.67871C8.21051 2.67871 8.89181 2.96092 9.39414 3.46325C9.89647 3.96558 10.1787 4.64688 10.1787 5.35728C10.1787 6.06768 9.89647 6.74899 9.39414 7.25132C8.89181 7.75365 8.21051 8.03585 7.5001 8.03585C6.7897 8.03585 6.1084 7.75365 5.60607 7.25132C5.10374 6.74899 4.82153 6.06768 4.82153 5.35728C4.82153 4.64688 5.10374 3.96558 5.60607 3.46325Z"
                      fill="#969696"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "#f9eddb" }}
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 5.35714V5.55777C0.999008 8.54564 3.97125 10.7143 7.48362 10.7143C10.9967 10.7143 13.9683 8.5456 14.9672 5.55777C15.0109 5.42716 15.0109 5.28712 14.9672 5.15652C13.9683 2.16868 10.9967 0 7.48362 0C3.97125 0 0.999008 2.16864 0 5.15652V5.35714ZM1.43174 5.35714C2.31265 7.69849 4.69099 9.375 7.48362 9.375C10.2769 9.375 12.6546 7.69852 13.5355 5.35714C12.6546 3.01576 10.2769 1.33929 7.48362 1.33929C4.69099 1.33929 2.31265 3.0158 1.43174 5.35714Z"
                      fill="#969696"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "#f9eddb" }}
                    ></path>
                  </svg>
                </button>
              </div>
              {error.password && (
                <p className="input__notification">{error.password}</p>
              )}
            </label>
          </div>

          <div
            className={`input ${
              error.passwordConfirmation ? "input--error" : ""
            }`}
          >
            <label>
              <p className="input__name">Confirm password</p>
              <div className="input-wrapper">
                <input
                  className="input-item input-item--right-icon"
                  type={isShowConfirmPass ? "text" : "password"}
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                  value={state.passwordConfirmation}
                  onChange={handleSetState}
                />
                <button
                  className="show-pass"
                  onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}
                >
                  <svg
                    className="password-type stroke"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-darkreader-inline-fill=""
                    style={{ "--darkreader-inline-fill": "none" }}
                  >
                    <path
                      d="M14.53 9.46992L9.47001 14.5299C8.82001 13.8799 8.42001 12.9899 8.42001 11.9999C8.42001 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.47 3.72998 5.18 5.80998 2.89 9.40998C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M8.42001 19.5299C9.56001 20.0099 10.77 20.2699 12 20.2699C15.53 20.2699 18.82 18.1899 21.11 14.5899C22.01 13.1799 22.01 10.8099 21.11 9.39993C20.78 8.87993 20.42 8.38993 20.05 7.92993"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M15.51 12.7C15.25 14.11 14.1 15.26 12.69 15.52"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M9.47 14.53L2 22"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                    <path
                      d="M22 2L14.53 9.47"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-darkreader-inline-stroke=""
                      style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                    ></path>
                  </svg>
                  <svg
                    className="text-type fill"
                    width="15"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-darkreader-inline-fill=""
                    style={{ "--darkreader-inline-fill": "none" }}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5001 4.018C7.1449 4.018 6.80425 4.1591 6.55309 4.41026C6.30192 4.66143 6.16082 5.00208 6.16082 5.35728C6.16082 5.71248 6.30192 6.05314 6.55309 6.3043C6.80425 6.55547 7.1449 6.69657 7.5001 6.69657C7.85531 6.69657 8.19596 6.55547 8.44712 6.3043C8.69829 6.05314 8.83939 5.71248 8.83939 5.35728C8.83939 5.00208 8.69829 4.66143 8.44712 4.41026C8.19596 4.1591 7.85531 4.018 7.5001 4.018ZM5.60607 3.46325C6.1084 2.96092 6.7897 2.67871 7.5001 2.67871C8.21051 2.67871 8.89181 2.96092 9.39414 3.46325C9.89647 3.96558 10.1787 4.64688 10.1787 5.35728C10.1787 6.06768 9.89647 6.74899 9.39414 7.25132C8.89181 7.75365 8.21051 8.03585 7.5001 8.03585C6.7897 8.03585 6.1084 7.75365 5.60607 7.25132C5.10374 6.74899 4.82153 6.06768 4.82153 5.35728C4.82153 4.64688 5.10374 3.96558 5.60607 3.46325Z"
                      fill="#969696"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "#f9eddb" }}
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 5.35714V5.55777C0.999008 8.54564 3.97125 10.7143 7.48362 10.7143C10.9967 10.7143 13.9683 8.5456 14.9672 5.55777C15.0109 5.42716 15.0109 5.28712 14.9672 5.15652C13.9683 2.16868 10.9967 0 7.48362 0C3.97125 0 0.999008 2.16864 0 5.15652V5.35714ZM1.43174 5.35714C2.31265 7.69849 4.69099 9.375 7.48362 9.375C10.2769 9.375 12.6546 7.69852 13.5355 5.35714C12.6546 3.01576 10.2769 1.33929 7.48362 1.33929C4.69099 1.33929 2.31265 3.0158 1.43174 5.35714Z"
                      fill="#969696"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "#f9eddb" }}
                    ></path>
                  </svg>
                </button>
              </div>
              {error.passwordConfirmation && (
                <p className="input__notification">
                  {error.passwordConfirmation}
                </p>
              )}
            </label>
          </div>
          <div className="form-submit form-submit--start">
            <button className="button button--full-width" onClick={send}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
