import Logo from "../../../Logo/Logo";
import DefaultAvatarIcon from "../../../Base/icon/DefaultAvatarIcon";
import ArrowDownIcon2 from "../../../Base/icon/ArrowDownIcon2";
import { useDispatch } from "react-redux";
import { setMenu } from "./slice";
import LogOut from "../../../Base/LogOut/LogOut";
import { useState } from "react";

const BAHeader = ({ t }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  return (
    <header className="header--green header">
      <div className="sandwich">
        <button
          onClick={() => dispatch(setMenu(true))}
          className="sandwich__open-btn"
          type="button"
        >
          <span className="sandwich__line" />
          <span className="sandwich__line" />
          <span className="sandwich__line" />
        </button>
      </div>
      <Logo t={t}>
        <img src="images/general/logo-white.svg" alt="" />
      </Logo>
      <div onClick={() => setActive(!active)} className="user-prev">
        <button className="user-prev__header">
          <div className="user-prev__logo">
            <DefaultAvatarIcon />
          </div>
          <span className="user-prev__name">{t("layout.myAccount")}</span>
          <div className="user-prev__arrow">
            <ArrowDownIcon2 />
          </div>
        </button>
        {active && <LogOut t={t} />}
      </div>
    </header>
  );
};
export default BAHeader;
