import CloseIcon2 from "../Base/icon/CloseIcon2";
import CardNumberIcon from "../Base/icon/CardNumberIcon";

const PaymentDetails = () => {
  return (
    <form className="form payment-section__form" action="">
      <div className="form__header">
        <span className="form__title">Payment delails</span>
        <button className="form__close" type="button">
          <CloseIcon2 />
        </button>
      </div>
      <div className="input">
        <label>
          <p className="input__name input__name--small">Cardholder name</p>
          <div className="input-wrapper">
            <input
              className="input-item input-item--small"
              type="text"
              placeholder="Cardholder name"
            />
          </div>
        </label>
      </div>
      <div className="input">
        <label>
          <p className="input__name input__name--small">Card Number</p>
          <div className="input-wrapper">
            <input
              className="input-item input-item--small input-item--left-icon"
              type="text"
              placeholder="Card Number"
            />
            <div className="input-icon">
              <CardNumberIcon />
            </div>
          </div>
        </label>
      </div>
      <div className="form__group form__group--gap form__group--margin-none">
        <div className="input">
          <label>
            <p className="input__name input__name--small">Date</p>
            <div className="input-wrapper">
              <input
                className="input-item input-item--small"
                type="text"
                placeholder="Date"
              />
            </div>
          </label>
        </div>
        <div className="input">
          <label>
            <p className="input__name input__name--small">CVV</p>
            <div className="input-wrapper">
              <input
                className="input-item input-item--small"
                type="text"
                placeholder="CVV"
              />
            </div>
          </label>
        </div>
      </div>
      <button
        className="button button--full-width button--small-height"
        type="button"
      >
        Pay 246 USD
      </button>
    </form>
  );
};
export default PaymentDetails;
