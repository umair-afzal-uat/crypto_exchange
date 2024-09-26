import ContactUsData from "./ContactUsData";
import { withTranslation } from "../../services/i18n";

const ContactUs = ({ t }) => {
  return (
    <main className="contact-us">
      <div className="contact-us__main">
        <div className="contact-us__side contact-us__side--decor contact-us__side--gradient" />
        <div className="contact-us__side contact-us__side--white" />
      </div>
      <div className="container">
        <div className="contact-us__content">
          <div className="contact-us__side contact-us__left">
            <div className="contact-us__info">
              <h1 className="contact-us__title">{t("contactUs:title")}</h1>
              <p className="contact-us__desc">{t("contactUs:desc")}</p>
            </div>
            <div className="contact-us__footer">
              <span className="contact-us__subtitle">
                {t("contactUs:info")}
              </span>
              <a
                className="contact-us__link"
                href="mailto:info@Crypto.Exchange"
              >
                info@Crypto.Exchange
              </a>
              <br />
              <a className="contact-us__link" href="tel:+18333591999">
                1-800-721-7830
              </a>
              <br />
              <span>
                1309 Coffeen Avenue STE 1200, Sheridan, Wyoming, 82801
              </span>
            </div>
          </div>
          <ContactUsData t={t} />
        </div>
      </div>
    </main>
  );
};
export default withTranslation(["contactUs"])(ContactUs);
