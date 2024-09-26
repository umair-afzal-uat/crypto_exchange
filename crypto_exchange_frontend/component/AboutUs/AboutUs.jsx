import DecorFigureIcon2 from "../Base/icon/DecorFigureIcon2";
import DecorFigureIcon3 from "../Base/icon/DecorFigureIcon3";
import DecorFigureIcon from "../Base/icon/DecorFigureIcon";
import { withTranslation } from "../../services/i18n";

const AboutUs = ({ t }) => {
  return (
    <div className="home">
      <div className="about-us about-us--padding">
        <div className="hero">
          <div className="hero__content hero__content--padding">
            <div className="container">
              <div className="home-section__content">
                <div className="home-section__img">
                  <img
                    className="home-section__pic"
                    src="images/content/content-img16.svg"
                    width="634"
                    height="363"
                    alt=""
                  />
                </div>
                <div className="home-section__info home-section__info--auto">
                  <h3 className="home-title home-title--big">
                    {t("aboutUs:title1")}
                    <br />
                    {t("aboutUs:title2")}
                  </h3>
                  <p className="hero__desc hero__desc--big hero__desc--bold">
                    {t("aboutUs:subTitle")}{" "}
                  </p>
                </div>
              </div>
              <p className="home-desc home-desc--padding">
                {t("aboutUs:text")}
              </p>
            </div>
          </div>
        </div>
        <div className="home-section home-section--padding-top home-section--margin-none">
          <div className="decor-figure">
            <DecorFigureIcon />
          </div>
          <div className="home-section__wrap">
            <div className="container">
              <div className="home-section__content">
                <div className="home-section__info home-section__info--big">
                  <h3 className="home-title home-title--big">
                    <span className="home-title home-title--black home-title--big">
                      {t("aboutUs:section1.title1")}
                    </span>{" "}
                    {t("aboutUs:section1.title2")}
                  </h3>
                  <p className="home-desc">
                    {t("aboutUs:section1.text1")}
                    <br />
                    <br />
                    {t("aboutUs:section1.text2")}
                  </p>
                  <p className="home-desc home-desc--bold">
                    {t("aboutUs:section1.subtitle")}
                  </p>
                </div>
                <div className="home-section__img">
                  <img
                    className="home-section__pic"
                    src="images/content/content-img3.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="mission-cards">
                <div className="mission-card">
                  <span className="mission-card__title">
                    {t("aboutUs:section1.mission")}
                  </span>
                </div>
                <div className="mission-card mission-card--green">
                  <span className="mission-card__title">
                    {t("aboutUs:section1.mission")}
                  </span>
                </div>
                <div className="mission-card mission-card--blue">
                  <span className="mission-card__title">
                    {t("aboutUs:section1.mission")}
                  </span>
                </div>
              </div>
              <p className="home-desc home-desc--small-width">
                {t("aboutUs:section1.about")}
              </p>
            </div>
          </div>
        </div>
        <div className="home-section home-section--padding-top home-section--reverse home-section--margin-none">
          <div className="home-section__wrap">
            <div className="container">
              <div className="home-section__content home-section__content--gap">
                <div className="home-section__img">
                  <img
                    className="home-section__pic"
                    src="images/content/content-img4.svg"
                    alt=""
                  />
                </div>
                <div className="home-section__info home-section__info--big">
                  <h3 className="home-title home-title--big">
                    <span className="home-title home-title--black home-title--big">
                      {t("aboutUs:section2.title1")}{" "}
                    </span>
                    {t("aboutUs:section2.title2")}
                  </h3>
                  <p className="home-desc home-desc--bold">
                    {t("aboutUs:section2.subtitle")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section home-section--padding-top home-section--index home-section--margin-none">
          <div className="decor-figure decor-figure--left">
            <DecorFigureIcon2 />
          </div>
          <div className="home-section__wrap">
            <div className="container">
              <div className="home-section__content">
                <div className="home-section__info home-section__info--big">
                  <div className="home-section__info-content">
                    <h3 className="home-title home-title--big">
                      <span className="home-title home-title--black home-title--big">
                        {t("aboutUs:section3.title1")}
                      </span>{" "}
                      {t("aboutUs:section3.title2")}
                    </h3>
                    <div className="link-block">
                      <span className="link-block__item">
                        {t("aboutUs:section3.subtitle1")}
                      </span>
                      <p className="home-desc">
                        {t("aboutUs:section3.text1")}{" "}
                      </p>
                    </div>
                    <div className="link-block">
                      <span className="link-block__item">
                        {" "}
                        {t("aboutUs:section3.subtitle2")}
                      </span>
                      <p className="home-desc">{t("aboutUs:section3.text2")}</p>
                    </div>
                    <div className="link-block">
                      <span className="link-block__item">
                        {t("aboutUs:section3.subtitle3")}
                      </span>
                      <p className="home-desc">{t("aboutUs:section3.text3")}</p>
                    </div>
                  </div>
                </div>
                <div className="home-section__img">
                  <img
                    className="home-section__pic"
                    src="images/content/content-img5.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section home-section--padding-top home-section--reverse home-section--margin-none">
          <div className="decor-figure">
            <DecorFigureIcon3 />
          </div>
          <div className="home-section__wrap">
            <div className="container">
              <div className="home-section__content home-section__content--gap">
                <div className="home-section__img">
                  <img
                    className="home-section__pic"
                    src="images/content/content-img17.svg"
                    alt=""
                  />
                </div>
                <div className="home-section__info home-section__info--big">
                  <span className="decor-quotes">
                    {" "}
                    <img src="images/content/quotes.svg" alt="" />
                  </span>
                  <p className="home-desc">
                    {t("aboutUs:section4.text1")}
                    <br />
                    <br />
                    {t("aboutUs:section4.text2")} <br />
                    <p className="home-desc home-desc--bold" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation(["aboutUs"])(AboutUs);
