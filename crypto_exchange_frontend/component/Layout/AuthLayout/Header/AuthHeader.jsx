import Link from "next/link";
import LogoIcon from "../../../Base/icon/LogoIcon";
import Logo from "../../../Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { customStyles, optionsLang } from "../../../../services/service";
import { setLanguage } from "../../../language/slice";
import { setStateLogin } from "../../../Auth/logIn/slice";

const AuthHeader = ({ t }) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);

  return (
    <header className="header">
      <Logo t={t}>
        <LogoIcon />
      </Logo>
      {/* <div className="lang">
        <Select
          className={"select__header"}
          defaultValue={language}
          styles={customStyles}
          options={optionsLang}
          isSearchable={false}
          id="long-value-select"
          instanceId="long-value-select"
          onChange={(e) => dispatch(setLanguage(e))}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div> */}
      <Link href="/logIn">
        <a
          onClick={() => dispatch(setStateLogin("login"))}
          className="button button--type2 auth-btn"
        >
          {t("layout.logIn")}
        </a>
      </Link>
      <Link href="/signUp">
        <a className="button button--white auth-btn">{t("layout.singUp")}</a>
      </Link>
    </header>
  );
};

export default AuthHeader;
