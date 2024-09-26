import MySettingIcon from "../icon/MySettingIcon";
import LogOutIcon from "../icon/LogOutIcon";
import Link from "next/link";
import { LogOutUsers } from "../../Auth/logIn/actions";
import { useDispatch } from "react-redux";
const LogOut = ({ t }) => {
  const dispatch = useDispatch();
  return (
    <div className="select__drop select__drop--visible">
      <div className="select__drop-scroll">
        <div className="select-drop__item">
          <ul className="select__drop-list">
            <li>
              <Link href="/accountSettings">
                <button type="button">
                  <span className="select__drop-icon">
                    <MySettingIcon />
                  </span>
                  {t("layout.accountSettings")}
                </button>
              </Link>
            </li>
            <li>
              <button onClick={() => dispatch(LogOutUsers())} type="button">
                <span className="select__drop-icon">
                  <LogOutIcon />
                </span>
                {t("layout.logOut")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
