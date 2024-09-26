import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { codeValid } from "../../../helpers/validation";
import {
  activateTwoFa,
  deactivateTwoFa,
  getQrImage,
} from "../../../redux/settings/actions";

const TwoFA = () => {
  const dispatch = useDispatch();
  const [is2FA, setIs2FA] = useState(false);
  const [state, setState] = useState("");
  const [error, setError] = useState(null);
  const { google2fa_enabled } = useSelector((state) => state.auth.data);
  const { qrData } = useSelector((state) => state.settings);
  const [isShow2FA, setIsShow2FA] = useState(false);
  const [isShowKey, setIsShowKey] = useState(true);

  const handleSetIs2FA = () => {
    setIs2FA(!is2FA);
    if (!google2fa_enabled && !is2FA) {
      dispatch(getQrImage());
    }
  };
  const handleSetIsShow2FA = () => {
    setIsShow2FA(!isShow2FA);
  };
  const handleSetIsShowKey = () => {
    setIsShowKey(!isShowKey);
  };
  const handleSetState = ({ target: { value } }) => {
    setState(value);
  };
  const send2FA = () => {
    if (google2fa_enabled) {
      dispatch(deactivateTwoFa({ totp: state }));
    } else {
      dispatch(activateTwoFa({ totp: state }));
    }
  };
  const send = () => {
    if (!state?.trim()?.length) {
      setError("Field is required");
      return;
    }
    if (!codeValid(state)) {
      setError("Incorrect code");
      return;
    }

    send2FA();
  };
  return (
    <div className="tabs__content">
      <div className="content-block content-block--small content-block--margin-none">
        <div className="content-block__inside">
          <div className="content-block__header">
            <h3 className="content-block__title">
              Enable Two-Factor Authentication
            </h3>
            <div className="switch switch--type2 input__switch">
              <label className="switch__label">
                <input
                  className="hidden"
                  type="checkbox"
                  checked={is2FA || google2fa_enabled}
                  onChange={handleSetIs2FA}
                />
                <div className="switch__toggler"></div>
              </label>
            </div>
          </div>
          <div className="content-block__main">
            <div className="notify content-block__row">
              <p className="content-block__desc">
                For your security, we&nbsp;strongly recommend enabling
                2FA&nbsp;on&nbsp;your account. After that, you will need
                to&nbsp;enter a&nbsp;one-time 6-digit code each time you are
                logging into your account, withdrawing funds or&nbsp;changing
                the password.
              </p>
            </div>
          </div>
        </div>
      </div>

      {is2FA && (
        <div className="content-block content-block--small">
          <div className="content-block__inside">
            <div className="content-block__main">
              <div className="steps">
                <div className="steps-item">
                  <div className="steps-item__header">
                    <div className="steps-item__num">
                      <span>1</span>
                    </div>
                    <span className="steps-item__title">Download 2FA App</span>
                  </div>
                  <div className="steps-item__main">
                    <p className="steps-item__desc">
                      You should download and install an authenticator
                      application, such as Google Authenticator or Authy, on
                      your mobile device. This app will generate one-time
                      6-digit access codes, which are required for logging into
                      your account.
                    </p>
                    <div className="download-links steps-item__footer">
                      <a className="download-link" href="/">
                        <img
                          src="images/content/app-store.png"
                          alt=""
                          width="136"
                          height="40"
                        />
                      </a>
                      <a className="download-link" href="/">
                        <img
                          src="images/content/google-play.png"
                          alt=""
                          width="136"
                          height="40"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="steps-item">
                  <div className="steps-item__header">
                    <div className="steps-item__num">
                      <span>2</span>
                    </div>
                    <span className="steps-item__title">
                      Save 2FA Backup Key and Scan QR Code
                    </span>
                  </div>
                  <div className="steps-item__main">
                    <p className="steps-item__desc">
                      Please, backup your 2FA&nbsp;recovery key to&nbsp;some
                      offline storage, write down on&nbsp; a&nbsp;paper.
                      If&nbsp;your mobile device gets lost, stolen
                      or&nbsp;erased, you will need this key to&nbsp;recover
                      your 2FA&nbsp;access.
                    </p>
                    <div className="qr-code steps-item__footer">
                      <div className="qr-code__img">
                        <img
                          src={qrData?.QR_Image}
                          alt=""
                          width="150"
                          height="150"
                        />
                      </div>
                      <div className="qr-code__main">
                        <div className="input">
                          <label>
                            <p className="input__name">Backup / Secret Key</p>
                            <div className="input-wrapper">
                              <input
                                className="input-item input-item--green input-item--right-icon"
                                type={isShowKey ? "text" : "password"}
                                readonly=""
                                value={qrData?.secret}
                              />
                              <button
                                className="show-pass"
                                type="button"
                                onClick={handleSetIsShowKey}
                              >
                                <svg
                                  className="text-type"
                                  width="18"
                                  height="16"
                                  viewBox="0 0 18 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-darkreader-inline-fill=""
                                  style={{ "--darkreader-inline-fill": "none" }}
                                >
                                  <path
                                    d="M12.1854 9.00043C12.1854 10.4854 10.9854 11.6854 9.50043 11.6854C8.01543 11.6854 6.81543 10.4854 6.81543 9.00043C6.81543 7.51543 8.01543 6.31543 9.50043 6.31543C10.9854 6.31543 12.1854 7.51543 12.1854 9.00043Z"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                  <path
                                    d="M9.49988 15.2025C12.1474 15.2025 14.6149 13.6425 16.3324 10.9425C17.0074 9.88504 17.0074 8.10754 16.3324 7.05004C14.6149 4.35004 12.1474 2.79004 9.49988 2.79004C6.85238 2.79004 4.38488 4.35004 2.66738 7.05004C1.99238 8.10754 1.99238 9.88504 2.66738 10.9425C4.38488 13.6425 6.85238 15.2025 9.49988 15.2025Z"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                </svg>
                                <svg
                                  className="password-type"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-darkreader-inline-fill=""
                                  style={{ "--darkreader-inline-fill": "none" }}
                                >
                                  <path
                                    d="M10.8979 7.10293L7.10293 10.8979C6.61543 10.4104 6.31543 9.74293 6.31543 9.00043C6.31543 7.51543 7.51543 6.31543 9.00043 6.31543C9.74293 6.31543 10.4104 6.61543 10.8979 7.10293Z"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                  <path
                                    d="M13.3649 4.32785C12.0524 3.33785 10.5524 2.79785 8.99988 2.79785C6.35238 2.79785 3.88488 4.35785 2.16738 7.05785C1.49238 8.11535 1.49238 9.89285 2.16738 10.9504C2.75988 11.8804 3.44988 12.6829 4.19988 13.3279"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                  <path
                                    d="M6.31543 14.6473C7.17043 15.0073 8.07793 15.2023 9.00043 15.2023C11.6479 15.2023 14.1154 13.6423 15.8329 10.9423C16.5079 9.88477 16.5079 8.10727 15.8329 7.04977C15.5854 6.65977 15.3154 6.29227 15.0379 5.94727"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                  <path
                                    d="M11.6326 9.52539C11.4376 10.5829 10.5751 11.4454 9.51758 11.6404"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                  <path
                                    d="M7.1025 10.8975L1.5 16.5"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                  <path
                                    d="M16.5 1.5L10.8975 7.1025"
                                    stroke="#C9D4EA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-darkreader-inline-stroke=""
                                    style={{
                                      "--darkreader-inline-stroke": "#ffffff",
                                    }}
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </label>
                        </div>
                        <div className="input-notify input-notify--padding-none">
                          <span className="notify__char">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              data-darkreader-inline-fill=""
                              style={{ "--darkreader-inline-fill": "none" }}
                            >
                              <path
                                d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                                stroke="#EB5757"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ff8a8a",
                                }}
                              ></path>
                              <path
                                d="M9 6V9.75"
                                stroke="#EB5757"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ff8a8a",
                                }}
                              ></path>
                              <path
                                d="M8.99609 12H9.00283"
                                stroke="#EB5757"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ff8a8a",
                                }}
                              ></path>
                            </svg>
                          </span>
                          <span className="input-notify__text">
                            Please, write down or print a copy of the key above
                            and store it safely.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="steps-item">
                  <div className="steps-item__header">
                    <div className="steps-item__num">
                      <span>3</span>
                    </div>
                    <span className="steps-item__title">
                      Confirm 2FA Activation
                    </span>
                  </div>
                  <div className="steps-item__main">
                    <div
                      className={`input steps__code ${error ? "input--error" : ""}`}
                    >
                      <label>
                        <p className="input__name">
                          2FA Code from Authenticator App
                        </p>
                        <div className="input-wrapper">
                          <input
                            className="input-item"
                            type={isShow2FA ? "text" : "password"}
                            placeholder="Enter a 6-digit 2FA code"
                            value={state}
                            onChange={handleSetState}
                          />
                          <button
                            className="show-pass"
                            type="button"
                            onClick={handleSetIsShow2FA}
                          >
                            <svg
                              className="text-type"
                              width="18"
                              height="16"
                              viewBox="0 0 18 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              data-darkreader-inline-fill=""
                              style={{ "--darkreader-inline-fill": "none" }}
                            >
                              <path
                                d="M12.1854 9.00043C12.1854 10.4854 10.9854 11.6854 9.50043 11.6854C8.01543 11.6854 6.81543 10.4854 6.81543 9.00043C6.81543 7.51543 8.01543 6.31543 9.50043 6.31543C10.9854 6.31543 12.1854 7.51543 12.1854 9.00043Z"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                              <path
                                d="M9.49988 15.2025C12.1474 15.2025 14.6149 13.6425 16.3324 10.9425C17.0074 9.88504 17.0074 8.10754 16.3324 7.05004C14.6149 4.35004 12.1474 2.79004 9.49988 2.79004C6.85238 2.79004 4.38488 4.35004 2.66738 7.05004C1.99238 8.10754 1.99238 9.88504 2.66738 10.9425C4.38488 13.6425 6.85238 15.2025 9.49988 15.2025Z"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                            </svg>
                            <svg
                              className="password-type"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              data-darkreader-inline-fill=""
                              style={{ "--darkreader-inline-fill": "none" }}
                            >
                              <path
                                d="M10.8979 7.10293L7.10293 10.8979C6.61543 10.4104 6.31543 9.74293 6.31543 9.00043C6.31543 7.51543 7.51543 6.31543 9.00043 6.31543C9.74293 6.31543 10.4104 6.61543 10.8979 7.10293Z"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                              <path
                                d="M13.3649 4.32785C12.0524 3.33785 10.5524 2.79785 8.99988 2.79785C6.35238 2.79785 3.88488 4.35785 2.16738 7.05785C1.49238 8.11535 1.49238 9.89285 2.16738 10.9504C2.75988 11.8804 3.44988 12.6829 4.19988 13.3279"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                              <path
                                d="M6.31543 14.6473C7.17043 15.0073 8.07793 15.2023 9.00043 15.2023C11.6479 15.2023 14.1154 13.6423 15.8329 10.9423C16.5079 9.88477 16.5079 8.10727 15.8329 7.04977C15.5854 6.65977 15.3154 6.29227 15.0379 5.94727"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                              <path
                                d="M11.6326 9.52539C11.4376 10.5829 10.5751 11.4454 9.51758 11.6404"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                              <path
                                d="M7.1025 10.8975L1.5 16.5"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                              <path
                                d="M16.5 1.5L10.8975 7.1025"
                                stroke="#C9D4EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data-darkreader-inline-stroke=""
                                style={{
                                  "--darkreader-inline-stroke": "#ffffff",
                                }}
                              ></path>
                            </svg>
                          </button>
                        </div>
                        {error && (
                          <p className="input__notification">{error}</p>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="form-submit form-submit--start">
                    <button
                      className="button button--full-width"
                      onClick={send}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFA;
