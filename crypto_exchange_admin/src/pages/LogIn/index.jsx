import { useState } from "react";
import LoginLayout from "../../components/LoginLayout";
import logo from "../../styles/images/content/sign-logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import notification from "../../components/Base/Notification";
import { emailValid, passwordValid } from "../../helpers/validation";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/action";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    captcha: null,
    totp: "2122212",
    remember: false,
  });
  const [error, setError] = useState({});
  const { push } = useHistory();
  const handleSetState = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.name === "remember" ? target.checked : target.value,
    });
  };

  const handleSetCaptcha = (value) => {
    setState({
      ...state,
      captcha: value,
    });
  };

  const validation = () => {
    let error = false;
    const errorType = {};

    if (!state.captcha) {
      notification({
        type: "error",
        message: "Сonfirm that you are human!",
      });
      error = true;
    }
    if (!emailValid(state.email)) {
      errorType.email = "Wrong email format";
      error = true;
    }
    if (!passwordValid(state.password)) {
      errorType.password = "Wrong password format";
      error = true;
    }
    setError(errorType);
    return error;
  };

  const send = () => {
    if (validation()) return;
    dispatch(login({ push, state }));
  };
  return (
    <LoginLayout>
      <section className="authorization-section">
        <div className="authorization-form">
          <div className="d-flex authorization-form__logo">
            <img src={logo} alt="" width="48" height="48" />
          </div>
          <p className="form-title">Sign in</p>
          <div className="authorization-form__body">
            <div className={`input ${error.email && "input--error"}`}>
              <label>
                <p className="input__name">Email address</p>
                <div className="input-wrapper">
                  <input
                    className="input-item input-item--left-icon"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleSetState}
                    value={state.email}
                  />
                  <span className="input-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "none" }}
                    >
                      <path
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="#9F9F9F"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        data-darkreader-inline-stroke=""
                        style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                      ></path>
                      <path
                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                        stroke="#9F9F9F"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        data-darkreader-inline-stroke=""
                        style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                      ></path>
                    </svg>
                  </span>
                </div>
              </label>
              {error.email && <p className="input__notification">{error.email}</p>}
            </div>
            <div className={`input ${error.password && "input--error"}`}>
              <label>
                <p className="input__name">Confirm password</p>
                <div className="input-wrapper">
                  <input
                    className="input-item input-item--left-icon"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleSetState}
                    value={state.password}
                  />
                  <span className="input-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "none" }}
                    >
                      <path
                        d="M19.79 14.931C17.73 16.981 14.78 17.611 12.19 16.801L7.47999 21.501C7.13999 21.851 6.46999 22.061 5.98999 21.991L3.80999 21.691C3.08999 21.591 2.41999 20.911 2.30999 20.191L2.00999 18.011C1.93999 17.531 2.16999 16.861 2.49999 16.521L7.19999 11.821C6.39999 9.22105 7.01999 6.27104 9.07999 4.22105C12.03 1.27104 16.82 1.27104 19.78 4.22105C22.74 7.17105 22.74 11.981 19.79 14.931Z"
                        stroke="#9F9F9F"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        data-darkreader-inline-stroke=""
                        style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                      ></path>
                      <path
                        d="M6.89001 17.491L9.19001 19.791"
                        stroke="#9F9F9F"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        data-darkreader-inline-stroke=""
                        style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                      ></path>
                      <path
                        d="M14.5 11.001C15.3284 11.001 16 10.3294 16 9.50098C16 8.67255 15.3284 8.00098 14.5 8.00098C13.6716 8.00098 13 8.67255 13 9.50098C13 10.3294 13.6716 11.001 14.5 11.001Z"
                        stroke="#9F9F9F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        data-darkreader-inline-stroke=""
                        style={{ "--darkreader-inline-stroke": "#fff6e5" }}
                      ></path>
                    </svg>
                  </span>
                </div>
              </label>
              {error.password && (
                <p className="input__notification">{error.password}</p>
              )}
            </div>
            <div className="captcha">
              <ReCAPTCHA
                sitekey="6LcjJ8MZAAAAANwDjOso9fFNtKbKN87lDcGag9IM"
                onChange={handleSetCaptcha}
              />
            </div>
            <div className="checkbox">
              <label className="checkbox__label">
                <input
                  className="hidden"
                  type="checkbox"
                  name="remember"
                  checked={state.remember}
                  onChange={handleSetState}
                />
                <div className="checkbox__item">
                  <span className="checkbox__item-icon">
                    <svg
                      className="fill"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26 26"
                      width="26"
                      height="26"
                      fill="#1a1a1a"
                      data-darkreader-inline-fill=""
                      style={{ "--darkreader-inline-fill": "#ffffff" }}
                    >
                      <path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"></path>
                    </svg>
                  </span>
                </div>
                <p className="checkbox__text">Remember me</p>
              </label>
            </div>
            <div className="form-submit">
              <button className="button button--full-width" onClick={send}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>
    </LoginLayout>
  );
};

export default Login;
