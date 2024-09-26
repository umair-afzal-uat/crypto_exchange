import { useEffect, useState } from "react";
import { getPaymentSystemsUser } from "../../BitcoinAdvance/BABase/actions";
import { useDispatch, useSelector } from "react-redux";
import { getStateCredit } from "../../BitcoinAdvance/BABase/slice";
import GoToBackIcon from "../../Base/icon/GoToBackIcon";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import classNames from "classnames";
import { handleModal } from "../../Base/Modal/slice";
import { loanPayUser } from "../../BitcoinAdvance/MyBA/actions";
import { getDataUsers } from "../../AccountSettings/actions";
import { getDataSettingUser } from "../../AccountSettings/slice";
const PaymentCrypto = ({ modalData }) => {
  const { method, loan_id, is_full, is_down } = modalData;
  const dispatch = useDispatch();
  const [paymentCurrency, setPaymentCurrency] = useState(null);
  const { paymentSystems } = useSelector(getStateCredit);
  const { user } = useSelector(getDataSettingUser);
  const payBtcData = {
    loan_id,
    payment_system: "plisio",
    is_full,
    currency: paymentCurrency,
    is_down: is_down,
    payerData: {
      email: user?.email,
    },
  };
  const closePopUp = () =>
    dispatch(handleModal({ modal: "", modalData: { ...modalData } }));
  useEffect(() => {
    dispatch(getDataUsers());
  }, []);
  useEffect(() => {
    dispatch(getPaymentSystemsUser());
  }, []);

  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <button
              onClick={() =>
                dispatch(
                  handleModal({
                    modal: "PaymentMethod",
                    modalData: { ...modalData },
                  })
                )
              }
              type="button"
              className="next-btn next-btn--rotate popup__back"
            >
              <GoToBackIcon />
            </button>
            <span className="popup__title">Pay by Crypto</span>
            <button onClick={closePopUp} className="popup__close" type="button">
              <ClosePopupIcon />
            </button>
          </div>
          <div className="popup__content">
            <div className="payment-pay">
              <div className="payment-pay__content">
                <span className="popup__content-title">Select Wallet</span>

                {/* { JSON.stringify(paymentSystems) } */}
                <p>
                  Only send payment through one of these cryptocurrencies. Any
                  other cryptocurrency may cause your payment to be delayed or
                  unreceivable.
                </p>
                {console.log(paymentSystems)}
                {paymentSystems
                  ?.filter((e) => e.name === "Plisio")[0]
                  ?.asset?.map((e) => (
                    <PaymentCryptoItem
                      key={e?.id}
                      imgSystem={e?.link}
                      title={e?.code}
                      name={e?.name}
                      active={paymentCurrency}
                      fnClik={(e) => setPaymentCurrency(e)}
                    />
                  ))}
                <button
                  disabled={!paymentCurrency}
                  onClick={() => dispatch(loanPayUser(payBtcData, method))}
                  className="button button--full-width button--margin-top"
                  type="button"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentCrypto;

const PaymentCryptoItem = ({ imgSystem, title, name, active, fnClik }) => {
  return (
    <>
      <button
        onClick={() => fnClik(title)}
        className={classNames("payment-btn", {
          "payment-btn--static": active === title,
        })}
        type="button"
      >
        <div className="payment-btn__icon">
          <img
            src={`/images/content/plisio/${imgSystem.replace(".png", "")}.svg`}
            alt=""
          />
        </div>
        <span className="payment-btn__text">
          <div>
          {title?.toUpperCase()}{" "}
          <span className="payment-btn__text payment-btn__text--small">
            {name}
          </span>
            </div>
          {title!="btc"?<span className="crypto">($150 Payment Minimum)</span>:""}
        </span>
        
      </button>

    </>
  );
};
