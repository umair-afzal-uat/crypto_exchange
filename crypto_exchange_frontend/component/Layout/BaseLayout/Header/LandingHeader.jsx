import Link from "next/link";
import CloseIcon from "../../../Base/icon/CloseIcon";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Logo from "../../../Logo/Logo";
import NawMenuList from "./NawMenuList";
const LandingHeader = ({ t }) => {
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [token, setToken] = useState("");
  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    setToken( localStorage.getItem("tokken"));
    const body = document.querySelector("body");
    active ? body.classList.add("active") : body.classList.remove("active");
  }, [active]);
  useEffect(() => {

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={classNames("header--regular header", {
        "active header--sticky": scroll > 150,
      })}
    >
      <div className="container">
        <div className="header__wrap">
        {/* { token ?
            <div className="auth-nav auth-nav--mobile">
              <Link href="/bitcoinAdvance">
                <a className="back-button">
                  {t("Dashboard")}
                </a>
              </Link>
            </div>
           :""
           } */}
          <Logo t={t}>
            <img src="images/general/logo-regular.svg" alt="logo" />
          </Logo>
          <nav className="main-nav header__nav">
            <NawMenuList t={t} />
          </nav>
          { !token ?
            <div className="auth-nav auth-nav--mobile">
              <Link href="/signUp">
                <a className="button auth-btn"> {t("layout.singUp")}</a>
              </Link>
              <Link href="/logIn">
                <a className="button button--second-green auth-btn wallet-detail__btn">
                  {t("layout.logIn")}
                </a>
              </Link>
            </div>
           :<div className="auth-nav auth-nav--mobile">
           <Link href="/bitcoinAdvance">
             <a className="back-button">
               {t("Dashboard")}
             </a>
           </Link>
         </div>
           }
            {/* { token ?
            <div className="auth-nav auth-nav--mobile">
              <Link href="/bitcoinAdvance">
                <a className="back-button">
                  {t("Dashboard")}
                </a>
              </Link>
            </div>
           :""
           } */}
          <div className="menu">
            <button
              className="menu__open-btn"
              type="button"
              onClick={() => setActive(!active)}
            >
              <span className="menu__line" />
              <span className="menu__line" />
              <span className="menu__line" />
            </button>
            <div className={classNames("menu__content", { active: active })}>
              <div className="menu__header">
                <button
                  className="menu__close-btn"
                  type="button"
                  onClick={() => setActive(!active)}
                >
                  <CloseIcon />
                </button>
              </div>
              <nav className="main-nav">
                <NawMenuList t={t} />
              </nav>
              <div className="menu__footer">
                <div className="auth-nav menu__auth-nav">
                  <Link href="/signUp">
                    <a className="button auth-btn"> {t("layout.singUp")}</a>
                  </Link>
                  <Link href="/logIn">
                    <a className="button button--second-green auth-btn">
                      {t("layout.logIn")}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default LandingHeader;
