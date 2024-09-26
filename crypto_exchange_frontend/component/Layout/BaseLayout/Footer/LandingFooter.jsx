import Link from "next/link";
import LogoIcon2 from "../../../Base/icon/LogoIcon2";
import Subscribe from "../../../Subscribe/Subscribe";
import FacebookIcon from "../../../Base/icon/FacebookIcon";
import TelegramIcon from "../../../Base/icon/TelegramIcon";
import TwitterIcon from "../../../Base/icon/TwitterIcon";
import Messanger1Icon from "../../../Base/icon/Messanger1Icon";
import LinkedinIcon from "../../../Base/icon/LinkedinIcon";
import Messanger2Icon from "../../../Base/icon/Messanger2Icon";
import VisaIcon from "../../../Base/icon/VisaIcon";
import MasterCartIcon from "../../../Base/icon/MasterCartIcon";
import PayPalIcon from "../../../Base/icon/PayPalIcon";
import PayonerIcon from "../../../Base/icon/PayonerIcon";
import StripeIcon from "../../../Base/icon/StripeIcon";
import SkrillIcon from "../../../Base/icon/SkrillIcon";
import NawMenuFooterItem from "./NawMenuFooterItem";
import SocialLinkItem from "./SocialLinkItem";
import PaymentsImgItem from "./PaymentsImgItem";
const LandingFooter = ({ t }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrap">
          <div className="footer__row">
            <Link href="/">
              <a className="logo" href="/">
                <div className="logo__icon">
                  <img src="images/general/logo-regular.svg" alt="" />
                </div>
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

            <nav className="footer-nav">
              <ul className="footer-nav__list">
                <NawMenuFooterItem
                  title={t("layout.getBa")}
                  link="/signUp"
                />
                <NawMenuFooterItem
                  title={t("layout.howItWorks")}
                  link="/howItWorks"
                />
                <NawMenuFooterItem
                  title={t("layout.aboutUs")}
                  link="/aboutUs"
                />
                <NawMenuFooterItem title={t("layout.faq")} link="/faq" />
                <NawMenuFooterItem
                  title={t("layout.contactUs")}
                  link="/contactUs"
                />
              </ul>
            </nav>
          </div>
          <div className="footer__row">
            <div className="footer__side">
              <span className="footer__side-title">
                {t("layout.subscribe")}
              </span>
              <Subscribe t={t} />
            </div>
            <div className="footer__side footer__side--right">
              <span className="footer__side-title">{t("layout.follow")}</span>
              <div className="footer__side-content">
                <div className="social footer__social">
                  <SocialLinkItem link="https://www.facebook.com/profile.php?id=100072364968097">
                    <FacebookIcon />
                  </SocialLinkItem>
                  <SocialLinkItem link="https://t.me/CryptoExchangecredit">
                    <TelegramIcon />
                  </SocialLinkItem>
                  <SocialLinkItem link="https://twitter.com/_CryptoExchange?t=SpCx6NC-gOsEhuVNLulQ0A&s=09">
                    <TwitterIcon />
                  </SocialLinkItem>
                  <SocialLinkItem link="https://medium.com/@CryptoExchange">
                    <Messanger2Icon />
                  </SocialLinkItem>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__row">
            <div className="payments footer__side" />
            <div className="footer__side">
              <p className="copy">{t("layout.copy")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
