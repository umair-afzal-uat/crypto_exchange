import { useState } from "react";
import Enable2FA from "./Enable2FA";
import constants from "../../../services/constants";
import Cookies from "js-cookie";
const Authentication = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="tabs__content">
      <div className="content-block content-block--small">
        <div className="content-block__inside">
          <div className="content-block__header">
            <h3 className="content-block__title">
              Enable Two-Factor Authentication
            </h3>
            <div className="switch">
              <label className="switch__label">
                <input
                  className="hidden"
                  disabled={!Cookies.get(constants.jwtToken)}
                  type="checkbox"
                  checked={active}
                  onChange={() => setActive(!active)}
                />
                <div className="switch__toggler" />
              </label>
            </div>
          </div>
        
          <div className="content-block__main">
            <div className="notify content-block__row">
              <p className="content-block__desc">
                For your security, we strongly recommend enabling 2FA on your
                account. After that, you will need to enter a one-time 6-digit
                code each time you are logging into your account, withdrawing
                funds or changing the password.
              </p>
            </div>
            {!active && (
              <div className="content-footer">
                <button
                  disabled={!Cookies.get(constants.jwtToken)}
                  onClick={() => setActive(!active)}
                  className="button button--bigest"
                  type="button"
                >
                  Enable 2FA
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {active && <Enable2FA />}
    </div>
  );
};
export default Authentication;
