import { useState } from "react";

import AppLayout from "../../components/AppLayout";
import ChangePassword from "./ChangePassword";

import TwoFA from "./TwoFA";

const Settings = () => {
  const [isShowTwoFa, setIsShowTwoFa] = useState(false);
  const handleSetIsShow = ({ target: { id } }) => {
    setIsShowTwoFa(!!id);
  };
  return (
    <AppLayout>
      <div className="title-block">
        <p className="title">Settings</p>
      </div>
      <div className="tabs">
        <ul className="tabs-nav">
          <li className={`tabs-nav__item ${!isShowTwoFa ? "active" : ""}`}>
            <button className="tabs-nav__btn" onClick={handleSetIsShow}>
              General account settings
            </button>
          </li>
          <li className={`tabs-nav__item ${isShowTwoFa ? "active" : ""}`}>
            <button
              id="2fa"
              className="tabs-nav__btn"
              onClick={handleSetIsShow}
            >
              Two-Factor Authentication (2FA)
            </button>
          </li>
        </ul>
      </div>
      {isShowTwoFa ? <TwoFA /> : <ChangePassword />}
    </AppLayout>
  );
};

export default Settings;
