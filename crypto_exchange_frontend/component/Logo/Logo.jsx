import Link from "next/link";
import { withTranslation } from "../../services/i18n";
import { useState, useEffect } from "react";

const Logo = ({ t, children }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("tokken"));
  }, []);
  return (
    <>
      { !token ?
        <Link href="/">
          <a className="logo header__logo">
            <div className="logo__icon">{children}</div>
            <span className="logo__text">
              <span className="logo__text logo__text--bold">
                {t("logo.name")}
              </span>
              {t("logo.title")}
              <span className="logo__text logo__text--green logo__text--small">
                {t("logo.text")}
              </span>
            </span>
          </a>
        </Link> 
        : <Link href="/bitcoinAdvance">
        <a className="logo header__logo">
          <div className="logo__icon">{children}</div>
          <span className="logo__text">
            <span className="logo__text logo__text--bold">
              {t("logo.name")}
            </span>
            {t("logo.title")}
            <span className="logo__text logo__text--green logo__text--small">
              {t("logo.text")}
            </span>
          </span>
        </a>
      </Link>
      }
    </>
  );
};
export default withTranslation(["common"])(Logo);
