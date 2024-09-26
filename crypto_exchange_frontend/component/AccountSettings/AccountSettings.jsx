import GeneralSettings from "./GeneralSettings/GeneralSettings";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Notification from "./Notification/Notification";
import Authentication from "./Authentication/Authentication";
import MyLoansIcon from "../Base/icon/MyLoansIcon";
import { getDataUsers } from "./actions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import constants from "../../services/constants";
import { useRouter } from "next/router";
const AccountSettings = () => {
  const [active, setActive] = useState("general");
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get(constants.jwtToken)) {
      router.push("/logIn");
    }
  }, []);
  useEffect(() => {
    dispatch(getDataUsers());
  }, []);
  return (
    <main className="main">
      <h3 className="section-title">
        <div className="section-title__icon">
          <MyLoansIcon />
        </div>
        <span className="section-title__text">Account Settings</span>
      </h3>
      <div className="main__content">
        <div className="tabs">
          <ul className="tabs-nav">
            <li
              onClick={() => setActive("general")}
              className={classNames("tabs-nav__item", {
                active: active === "general",
              })}
            >
              <button className="tabs-nav__btn">
                General account settings
              </button>
            </li>
            <li
              onClick={() => setActive("authentication")}
              className={classNames("tabs-nav__item", {
                active: active === "authentication",
              })}
            >
              <button className="tabs-nav__btn">
                Two-Factor Authentication (2FA)
              </button>
            </li>
            <li
              onClick={() => setActive("notifications")}
              className={classNames("tabs-nav__item", {
                active: active === "notifications",
              })}
            >
              <button className="tabs-nav__btn">E-mail notifications</button>
            </li>
          </ul>
          {active === "general" && <GeneralSettings />}
          {active === "notifications" && <Notification />}
          {active === "authentication" && <Authentication />}
        </div>
      </div>
    </main>
  );
};
export default AccountSettings;
