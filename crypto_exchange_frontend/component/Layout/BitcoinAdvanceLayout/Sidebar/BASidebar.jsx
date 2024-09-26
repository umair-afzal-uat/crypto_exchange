import CloseIcon from "../../../Base/icon/CloseIcon";
import BAIcon from "../../../Base/icon/BAIcon";
import BAMyDaicoinIcon from "../../../Base/icon/BAMyDaicoinIcon";
import BATransactionIcon from "../../../Base/icon/BATransactionIcon";
import BAAffiliateIcon from "../../../Base/icon/BAAffiliateIcon";
import Link from "next/link";
import Select from "react-select";
import { customStyles2, optionsLang } from "../../../../services/service";
import { getLanguageData, setLanguage } from "../../../language/slice";
import { useDispatch, useSelector } from "react-redux";
import { getStateMenu, setMenu } from "../Header/slice";
import classNames from "classnames";
import { useEffect } from "react";
import SideBarMenuItem from "./SideBarMenuItem/SideBarMenuItem";
import SideBarSubMenuItem from "./SideBarSubMenuItem/SideBarSubMenuItem";

const BASidebar = ({ t }) => {
  const dispatch = useDispatch();
  const { language } = useSelector(getLanguageData);
  const { menu } = useSelector(getStateMenu);
  useEffect(() => {
    const body = document.querySelector("body");
    menu ? body.classList.add("active") : body.classList.remove("active");
  }, [menu]);
  return (
    <aside
      className={classNames("sidebar", {
        active: menu,
      })}
    >
      <div className="sidebar__header">
        <button
          onClick={() => dispatch(setMenu(false))}
          className="sidebar__close-btn"
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="sidebar__main">
        <nav className="sidebar-nav">
          <ul className="sidebar-nav__list">
            <SideBarMenuItem
              title={t("layout.bitcoinAdvance")}
              icon={<BAIcon />}
              link="/bitcoinAdvance"
            />
            <SideBarMenuItem
              submenu={true}
              link="/myWallet"
              title={t("layout.myBitcoinAdvances")}
              icon={<BAMyDaicoinIcon />}
            >
              <ul className="sidebar-nav__sublist">
                <SideBarSubMenuItem
                  link="/myWallet"
                  title={t("layout.myWallet")}
                />
                <SideBarSubMenuItem
                  link="/myLoans"
                  title={t("layout.myLoans")}
                />
              </ul>
            </SideBarMenuItem>

            <SideBarMenuItem
              link="/transactionHistory"
              title={t("layout.transactionHistory")}
              icon={<BATransactionIcon />}
            />
            <SideBarMenuItem
              link="/affiliateProgram"
              title={t("layout.affiliateProgram")}
              icon={<BAAffiliateIcon />}
            />
          </ul>
        </nav>
        {/* <div className="lang sidebar__lang">
          <div className="select-block">
            <div className="select select--white select--full-width">
              <Select
                className={"select__header"}
                defaultValue={language}
                styles={customStyles2}
                options={optionsLang}
                isSearchable={false}
                onChange={(e) => dispatch(setLanguage(e))}
                id="long-value-select4"
                instanceId="long-value-select4"
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
        </div> */}
        <br></br>
        <br></br>
      </div>
      <div className="sidebar__footer">
        <div className="contacts">
          <h3 className="section-title">Contact</h3>
          <div className="contacts__content">
            <a
              className="link link--green"
              href="mailto:info@Crypto.Exchange"
            >
              info@Crypto.Exchange
            </a>
          </div>
        </div>
        <nav className="second-nav">
          <ul className="second-nav__list">
            <SubMenuItem title={t("layout.faq")} link="/faq" />
            <SubMenuItem title={t("layout.aboutUs")} link="/aboutUs" />
            <SubMenuItem title={t("layout.contactUs")} link="/contactUs" />
            <SubMenuItem title={t("layout.howItWorks")} link="/howItWorks" />
            <SubMenuItem title={t("layout.policy")} link="/privacyPolicy" />
            <SubMenuItem
              title={t("layout.termsConditions")}
              link="/termsOfService"
            />
          </ul>
        </nav>
        <p className="copy-text sidebar__copy">
          {t("layout.copyPart1")}
          <br />
          {t("layout.copyPart2")}
        </p>
      </div>
    </aside>
  );
};
export default BASidebar;

const SubMenuItem = ({ title, link }) => {
  return (
    <li className="second-nav__item">
      <Link href={link}>
        <a className="second-nav__link">
          {title}
        </a>
      </Link>
    </li>
  );
};
