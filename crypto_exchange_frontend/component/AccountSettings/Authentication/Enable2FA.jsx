import { useEffect, useState } from "react";
import api from "../../../services/api";
import ShowPasIcon from "../../Base/icon/ShowPasIcon";
import LockPasIcon from "../../Base/icon/LockPasIcon";
import QuestionMarkIcon2 from "../../Base/icon/QuestionMarkIcon2";
import { disable2fa, enable2fa } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { getDataSettingUser } from "../slice";
import { errorsMessage } from "../../../services/service";
const Enable2FA = () => {
  const [code, setCode] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [showKey, setShowKey] = useState(true);
  const [accessCodes, setAccessCodes] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector(getDataSettingUser);
  const set2fa = () => {
    if (accessCodes.length === 6) {
      if (user?.google2fa_enabled) {
        dispatch(disable2fa(accessCodes));
      } else {
        dispatch(enable2fa(accessCodes));
      }
    }
  };
  useEffect(async () => {
    try {
      const { data, status } = await api.users.generateSecretKey2fa();
      if (status >= 200 && status < 300) {
        setCode(data);
      }
    } catch (error) {
      errorsMessage(error);
    }
  }, []);
  const seadKey = (event) => {
    if (event.key === "Enter") {
      set2fa();
    }
  };
  return (
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
                  You should download and install an authenticator application,
                  such as Google Authenticator or Authy, on your mobile device.
                  This app will generate one-time 6-digit access codes, which
                  are required for logging into your account.
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
                  Please, backup your 2FA recovery key to some offline storage,
                  write down on a paper. If your mobile device gets lost, stolen
                  or erased, you will need this key to recover your 2FA access.
                </p>
                <div className="qr-code steps-item__footer">
                  <div className="qr-code__img">
                    <img src={code?.QR_Image} alt="" width="150" height="150" />
                  </div>
                  <div className="qr-code__main">
                    <div className="input">
                      <label>
                        <p className="input__name">Backup / Secret Key</p>
                        <div className="input-wrapper">
                          <input
                            className="input-item input-item--green input-item--right-icon"
                            type={showCode ? "text" : "password"}
                            readOnly={true}
                            defaultValue={code?.secret}
                          />
                          <button
                            onClick={() => setShowCode(!showCode)}
                            className="show-pass"
                            type="button"
                          >
                            <ShowPasIcon />
                            <LockPasIcon />
                          </button>
                        </div>
                      </label>
                    </div>
                    <div className="input-notify input-notify--padding-none">
                      <span className="notify__char">
                        <QuestionMarkIcon2 />
                      </span>
                      <span className="input-notify__text">
                        Please, write down or print a copy of the key above and
                        store it safely.
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
                <div className="input steps__code">
                  <label>
                    <p className="input__name">
                      2FA Code from Authenticator App
                    </p>
                    <div className="input-row input-row--regular">
                      <div className="input-wrapper">
                        <input
                          value={accessCodes}
                          onChange={(event) =>
                            setAccessCodes(event.target.value)
                          }
                          onKeyPress={seadKey}
                          autoComplete="new-password"
                          className="input-item"
                          type={showKey ? "text" : "password"}
                          placeholder="Enter a 6-digit 2FA code"
                        />
                        <button
                          onClick={() => setShowKey(!showKey)}
                          className="show-pass"
                          type="button"
                        >
                          <ShowPasIcon />
                          <LockPasIcon />
                        </button>
                      </div>
                      <button
                        onClick={set2fa}
                        className="button button--auto-height"
                      >
                        Save
                      </button>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Enable2FA;
