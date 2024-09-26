import DecorFigureIcon2 from "../Base/icon/DecorFigureIcon2";
import DecorFigureIcon from "../Base/icon/DecorFigureIcon";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { i18n, withTranslation } from "../../services/i18n";
import { getFaqsList } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { getFaqs } from "./action";
const Faq = ({ t }) => {
  const { faqs } = useSelector(getFaqsList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFaqs());
  }, []);
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [active6, setActive6] = useState(false);
  const [active7, setActive7] = useState(false);
  const [active8, setActive8] = useState(false);
  const [active9, setActive9] = useState(false);
  const [active10, setActive10] = useState(false);

  return (
    <div className="home">
      <div className="hero">
        <div className="decor-figure">
          <DecorFigureIcon />
        </div>
        <div className="hero__wrap">
          <div className="hero__content">
            <div className="container">
              <div className="hero__info">
                <h1 className="main-title hero__title">
                  <span className="main-title main-title--black">
                    {t("faq:title1")}
                  </span>{" "}
                  {t("faq:title2")}{" "}
                </h1>
                <p className="hero__desc">{t("faq:subTitle")}</p>
               
              </div>
              <div className="hero__img hero__img--static">
                <img src="images/content/faq-img.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section faq">
        <div className="decor-figure decor-figure--left">
          <DecorFigureIcon2 />
        </div>
        <div className="home-section__wrap">
          <div className="container">
           <h5 className="home-title faq__title home-title--black"> Check out our helpdesk for additional resources and information</h5>
            <a  href="https://CryptoExchange.helpsite.com" target="_blank" className="faq-button">CryptoExchange Helpdesk</a>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">What is CryptoExchange?
                  </span>
                  <div onClick={() => setActive(!active)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">Crypto.Exchange is a cryptocurrency credit service that provides Bitcoin advances to users who want to acquire Bitcoin at today’s price but cannot or do not want to pay the full amount for the Bitcoin upfront.  We are the only service that allows users to purchase Bitcoin through a weekly payment plan.
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active1,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">How does it work?
                  </span>
                  <div onClick={() => setActive1(!active1)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active1 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">1. &nbsp; Select ‘Sign-Up’ to register for your account. If you’ll be making your advance payments using cryptocurrency no need to enter your social &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;security number or debit card information. If you’d like to pay with a debit card then you’ll enter your information during sign-up.
                      <br /><br />2. &nbsp; Select the amount you’d like to advance for $1,000 to $10,000 and how long you want to repay your advance, from 5 to 16 weeks. <br /><br />3. &nbsp; Agree to the terms and conditions and select ‘Get Loan Now’.
                      <br /><br /> 4. &nbsp; Follow the steps to make your first payment by crypto using one of our available crypto options, or pay with debit by connecting with one of our &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;live chat agents to verify your identity and set up your debit card payment account.
                      <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***Please note that your first debit card payment will not be processed until you have completed the identity verification with one of our Live &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agents.<br /> <br />5.  Continue to make your weekly payments. Once your advance is paid off your bitcoin will be unlocked and you are free to withdraw it to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;whichever wallet you choose.
                    </p>
                  </div>
                </div>

              </div>

            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active3,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">What if I need to change the Debit Card I have on file or pay with crypto?
                  </span>
                  <div onClick={() => setActive3(!active3)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active3 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">If you would like to change your payment card or pay with crypto instead please contact customer service through LiveChat at least 72 hours before your payment date. Once a payment has been processed it can not be reversed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active4,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">What if I can’t make one of my weekly payments?

                  </span>
                  <div onClick={() => setActive4(!active4)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active4 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">If you would like to skip a payment please log into your CryptoExchange account and select the ‘Defer Payment’ option under ‘My Bitcoin Advances’ at least 24 hours before your payment due date.<br />
                      You can skip as many payments as you would like as long as the advance is paid in full by the final payment due date.<br />
                      Final advance payment due date can be found under <b>My Bitcoin Advances> My Loans> Details.</b>
                    </p>
                  </div>
                </div>

              </div>

            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active5,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">Can I receive an Advance for other cryptocurrencies?

                  </span>
                  <div onClick={() => setActive5(!active5)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active5 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">At this time CryptoExchange only supports Bitcoin advances. Be on the lookout for additional coin offerings.  Please refer to the extended FAQ for the most up-to-date details. <br />
                      <a href="https://CryptoExchange.helpsite.com/articles/82766-can-i-receive-an-advance-for-other-cryptocurrencies">https://CryptoExchange.helpsite.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active6,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">What happens if I miss a payment?
                  </span>
                  <div onClick={() => setActive6(!active6)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active6 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">CryptoExchange understands that life happens. If a user chooses to defer a payment that payment becomes due at the end of the loan term.
                      <br />
                      If you are unable to make a payment simply,<br />
                      <br />
                      &nbsp; 1. &nbsp;Log into your CryptoExchange account <br />
                      &nbsp; 2.  &nbsp;Find the payment you would like to skip under ‘My Bitcoin Advances’<br />
                      &nbsp; 3.  &nbsp;Select ‘Defer Payment’.
                      <br />
                      <br />
                      All debit card payments are set-up for automatic payments. To make sure that deferred payments are not attempted, deferment requests must be made at least 24 hours before the payment is due.

                    </p>
                  </div>
                </div>

              </div>

            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active7,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">What if my advance becomes worth more than my balance owed, can I use my growth to pay off my loan balance?

                  </span>
                  <div onClick={() => setActive7(!active7)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active7 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">Absolutely, if the increase in your Bitcoin advance covers the remaining balance owed you can use the growth to pay off your advance.  A 5% fee will apply.  If your account has reached this threshold please contact customer service and they will assist with the process.
                    </p>
                  </div>
                </div>

              </div>

            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active8,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">Can I withdraw my Bitcoin before I have completed paying for my advance?
                  </span>
                  <div onClick={() => setActive8(!active8)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active8 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">All bitcoin advances are held in a custodial wallet until Advances are paid in full. Once the advance has been paid users are free to withdraw their bitcoin into any wallet they choose.

                    </p>
                  </div>
                </div>

              </div>

            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active9,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">Do I need to take out an advance to participate in the referral program?

                  </span>
                  <div onClick={() => setActive9(!active9)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active9 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">No. Anyone can participate in our referral program and earn commissions.  To get started follow these steps-<br />
                      &nbsp; 1. Sign-up.<br />
                      &nbsp;2.  Log in and head over to account settings in the top right corner.  Within your profile add your Bitcoin address for where you want to receive your &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payouts.<br />
                      &nbsp; 3. Next, go to the Affiliate Program tab on the right side menu.  Here you will find <br />your referral link to share.

                    </p>
                  </div>
                </div>

              </div>

            </div>
            <div className="faq-list">
              <div className="faq-item accordion">
                <button
                  className={classNames("faq-item__header accordion__header", {
                    "accordion__header--active": active10,
                  })}
                  type="button"
                >
                  <span className="faq-item__title">How does the referral program work?

                  </span>
                  <div onClick={() => setActive10(!active10)} className="faq-item__close" />
                </button>
                <div
                  className="faq-item__main accordion__main"
                  style={{ maxHeight: `${active10 ? "inherit" : 0}` }}
                >
                  <div className="accordion__main-content">
                    <p className="faq-item__desc">When you refer a new user to Crypto Exchange and they take out an advance you will receive 2.5% of their advance amount. The only qualifier to receive payment is that your referral has made 2 payments towards their advance.  Payments are sent 31 days after loan initiation or after the completion of the 2nd payment.

                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation(["faq"])(Faq);
