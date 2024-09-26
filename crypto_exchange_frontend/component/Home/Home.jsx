import Link from "next/link";
import DecorFigureIcon2 from "../Base/icon/DecorFigureIcon2";
import DecorFigureIcon3 from "../Base/icon/DecorFigureIcon3";
import LikeIcon from "../Base/icon/LikeIcon";
import ReviewsSlider from "../Base/ReviewsSlider/ReviewsSlider";
import ServicesItemHome from "./ServicesItemHome";
import PartnerItemHome from "./PartnerItemHome";
import DecorFigureIcon4 from "../Base/icon/DecorFigureIcon4";
import CalculatorNew from "./CalculatorNew";
import { withRouter } from 'next/router'
const Home = ({ t }) => {
  return (
    <div className="home">
      <div className="hero">
        <div className="decor-figure">
          <DecorFigureIcon3 />
        </div>
        <div className="hero__wrap">
          <div className="hero__content hero__content--flex">
            <div className="container">
              <div className="hero__info hero__info--smallest">
                <h1 className="main-title hero__title">
                  {t("homePage:hero.title")}{" "}
                  <span className="main-title main-title--black">
                    {t("homePage:hero.title2")}
                  </span>
                </h1>
                <p className="hero__desc">{t("homePage:hero.text")} </p>
                <div className="hero__info-footer">
                  <Link href="/signUp">
                    <a className="button button--wider button--gradient hero__btn">
                      {t("homePage:getStarted")}
                    </a>
                  </Link>
                </div>
              </div>
              <CalculatorNew />
            </div>
          </div>
          <div className="advantages-block">
            <div className="container">
              <div className="advantages-list">
                <div className="advantages-item">
                  <div className="advantages-item__icon">
                    <img src="images/content/adv-icon.svg" alt="" />
                  </div>
                  <span className="advantages-item__text">
                    {t("homePage:hero.advantages-block.title1")}
                  </span>
                </div>
                <div className="advantages-item">
                  <div className="advantages-item__icon">
                    <img src="images/content/adv-icon3.svg" alt="" />
                  </div>
                  <span className="advantages-item__text">
                    {t("homePage:hero.advantages-block.title2")}
                  </span>
                </div>
                <div className="advantages-item">
                  <div className="advantages-item__icon">
                    <img src="images/content/adv-icon2.svg" alt="" />
                  </div>
                  <span className="advantages-item__text">
                    {t("homePage:hero.advantages-block.title3")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section home-section--margin">
        <div className="container">
          <div className="home-section__content home-section__content--height">
            <div className="home-section__img home-section__img--absolute-left">
              <img
                className="home-section__pic"
                src="images/content/content-img13.svg"
                width="743"
                height="625"
                alt=""
              />
            </div>
            <div className="home-section__info home-section__info--right home-section__info--regular">
              <h3 className="home-title">
                <span className="home-title home-title--black">
                  {t("homePage:homeSection1.title1")}
                </span>{" "}
                {t("homePage:homeSection1.title2")}
              </h3>
              <p className="home-desc">
                <Link href="/logIn">
                  <a className="link link--green link--inline">
                    {t("homePage:homeSection1.title2")}
                  </a>
                </Link>{" "}
                {t("homePage:homeSection1.text")}
              </p>
              <p className="decor-text decor-text--margin-top">
                {t("homePage:homeSection1.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section home-section--index home-section--margin">
        <div className="decor-figure decor-figure--left decor-figure--top">
          <DecorFigureIcon2 />
        </div>
        <div className="home-section__wrap">
          <div className="container">
            <div className="home-section__content">
              <div className="home-section__info">
                <h3 className="home-title">
                  <span className="home-title home-title--black">
                    {t("homePage:homeSection2.title1")}
                  </span>{" "}
                  <br />
                  {t("homePage:homeSection2.title2")}
                </h3>
                <p className="home-desc">
                  {t("homePage:homeSection2.text1")}
                  <br />
                  <br />
                  {t("homePage:homeSection2.text2")}
                  <br />
                  <br />
                  <Link href="/logIn">
                    <a href="/" className="link link--green link--inline">
                      {t("homePage:homeSection2.title2")}
                    </a>
                  </Link>{" "}
                  {t("homePage:homeSection2.text3")}
                </p>
              </div>
              <div className="home-section__img">
                <img
                  className="home-section__pic"
                  src="images/content/content-img14.svg"
                  width="635"
                  height="597"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="partners">
        <div className="container">
          <div className="partners-list">
            <PartnerItemHome>
              <img
                src="images/content/partners-item.svg"
                width="70"
                height="70"
                alt=""
              />
            </PartnerItemHome>
            <PartnerItemHome>
              <img
                src="images/content/partners-item2.svg"
                width="80"
                height="26"
                alt=""
              />
            </PartnerItemHome>
            <PartnerItemHome>
              <img
                src="images/content/partners-item3.svg"
                width="66"
                height="41"
                alt=""
              />
            </PartnerItemHome>
            <PartnerItemHome>
              <img
                src="images/content/partners-item4.svg"
                width="70"
                height="70"
                alt=""
              />
            </PartnerItemHome>
            <PartnerItemHome>
              <img
                src="images/content/partners-item5.svg"
                width="70"
                height="70"
                alt=""
              />
            </PartnerItemHome>
            <PartnerItemHome>
              <img
                src="images/content/partners-item6.svg"
                width="50"
                height="52"
                alt=""
              />
            </PartnerItemHome>
            <PartnerItemHome>
              <img
                src="images/content/partners-item7.svg"
                width="70"
                height="70"
                alt=""
              />
            </PartnerItemHome>
            <PartnerItemHome>
              <img
                src="images/content/partners-item8.svg"
                width="70"
                height="70"
                alt=""
              />
            </PartnerItemHome>
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="decor-figure">
          <DecorFigureIcon3 />
        </div>
        <div className="home-section__wrap">
          <div className="container">
            <div className="home-section__content home-section__content--big">
              <div className="home-section__info">
                <h3 className="home-title">
                  {t("homePage:homeSection3.title")}{" "}
                  <span className="home-title home-title--black">
                    {t("homePage:homeSection3.subtitle")}
                  </span>
                </h3>
                <p className="home-desc">{t("homePage:homeSection3.title1")}</p>
              </div>
              <div className="home-section__right home-section__right--center">
                <div className="achievments-block">
                  <div className="achievments-list">
                    <div className="achievments-item">
                      <span className="achievments-item__desc">
                        {t("homePage:homeSection3.text1")}
                      </span>
                      <span className="achievments-item__pos">
                        <span className="achievments-item__pos achievments-item__pos--bold">
                          {t("homePage:homeSection3.text1des")}
                        </span>{" "}
                        <br />
                        {t("homePage:homeSection3.text1about1")} <br />
                        {t("homePage:homeSection3.text1about2")}
                      </span>
                    </div>
                    <div className="achievments-item">
                      <span className="achievments-item__desc">
                        {t("homePage:homeSection3.text2")}
                      </span>
                      <span className="achievments-item__pos">
                        <span className="achievments-item__pos achievments-item__pos--bold">
                          {t("homePage:homeSection3.text2des")}
                        </span>{" "}
                        <br />
                        {t("homePage:homeSection3.text2about")}
                      </span>
                    </div>
                    <div className="achievments-item">
                      <span className="achievments-item__desc">
                        {t("homePage:homeSection3.text3")}
                      </span>
                      <span className="achievments-item__pos">
                        <span className="achievments-item__pos achievments-item__pos--bold">
                          {t("homePage:homeSection3.text3des")}
                        </span>{" "}
                        <br />
                        {t("homePage:homeSection3.text3about")}
                      </span>
                    </div>
                    <div className="achievments-item">
                      <span className="achievments-item__desc">
                        {t("homePage:homeSection3.text4")}
                      </span>
                      <span className="achievments-item__pos">
                        <span className="achievments-item__pos achievments-item__pos--bold">
                          {t("homePage:homeSection3.text4des")}
                        </span>{" "}
                        <br />
                        {t("homePage:homeSection3.text4about")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-section__bottom">
              <Link href="/logIn">
                <a className="button button--gradient button--wider">
                  {t("homePage:getStarted")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="container">
          <div className="garants">
            <div className="garants__wrap">
              <div className="garants__content">
                <div className="garants__info">
                  <h3 className="garants__title">
                    {t("homePage:homeSection4.title")}
                  </h3>
                  <p className="garants__desc">
                    {t("homePage:homeSection4.subTitle")}
                  </p>
                </div>
                <div className="garants__img">
                  <img src="images/content/check.png" alt="" />
                </div>
              </div>
            </div>
            <div className="garants__footer">
              <div className="garants-list">
                <ServicesItemHome title={t("homePage:homeSection4.item1")}>
                  <img src="images/content/garants-icon.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item2")}>
                  <img src="images/content/garants-icon2.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item3")}>
                  <img src="images/content/garants-icon15.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item4")}>
                  <img src="images/content/garants-icon16.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item5")}>
                  <img src="images/content/garants-icon5.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item6")}>
                  <img src="images/content/garants-icon6.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item7")}>
                  <img src="images/content/garants-icon3.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item8")}>
                  <img src="images/content/garants-icon13.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item9")}>
                  <img src="images/content/garants-icon8.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item10")}>
                  <img src="images/content/garants-icon7.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item11")}>
                  <img src="images/content/garants-icon2.svg" alt="" />
                </ServicesItemHome>
                <ServicesItemHome title={t("homePage:homeSection4.item12")}>
                  <img src="images/content/garants-icon12.svg" alt="" />
                </ServicesItemHome>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section home-section--index">
        <div className="decor-figure decor-figure--left">
          <DecorFigureIcon4 />
        </div>
        <div className="payment-section">
          <div className="container">
            <div className="home-section__content">
              <div className="home-section__info home-section__info--big">
                <div className="home-section__info-content">
                  <h3 className="home-title">
                    {t("homePage:homeSection5.title")}{" "}
                    <span className="home-title home-title--black">
                      {t("homePage:homeSection5.subTitle")}
                    </span>
                  </h3>
                  <div className="payments-preview">
                    <img src="images/content/payment-graphic.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="home-section__right">
                <div className="home-section__img home-section__img--absolute">
                  <img src="images/content/content-img2.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section home-section--padding home-section--index">
        <div className="reviews home-section__wrap">
          <div className="container">
            <div className="section-header">
              <div className="section-header__left">
                <div className="section-header__circle">
                  <div className="section-header__icon">
                    <LikeIcon />
                  </div>
                </div>
                <h3 className="home-title reviews__title">
                  <span className="home-title home-title--black reviews__title">
                    {t("homePage:homeSection6.title")}
                  </span>{" "}
                  {t("homePage:homeSection1.title2")}
                </h3>
              </div>
              <div className="slider-navigation">
                <button
                  className="slider-navigation__btn slider-navigation__prev reviews__prev"
                  type="button"
                >
                  <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.97576 16.9362L1.28391 9.22249L8.97576 1.50879"
                      stroke="#E1E9F8"
                      strokeWidth="1.96667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="slider-navigation__btn slider-navigation__next reviews__next"
                  type="button"
                >
                  <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.97576 16.9362L1.28391 9.22249L8.97576 1.50879"
                      stroke="#E1E9F8"
                      strokeWidth="1.96667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="reviews-slider">
            <div className="reviews-slider__bg">
              <div className="reviews-slider__bg-inner" />
            </div>
            <div className="swiper-container reviews-slider__container">
              <ReviewsSlider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Home);
