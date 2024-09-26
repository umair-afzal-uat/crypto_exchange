import GoToBackIcon from "../../Base/icon/GoToBackIcon";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import PopUpContentItem from "../../Base/PopUpContentItem/PopUpContentItem";
import { getLoansDisplayAmount } from "../../BitcoinAdvance/MyBA/actions";
import { useEffect } from "react";
import { getDataUsers } from "../../AccountSettings/actions";
import { loanPayUser } from "../../BitcoinAdvance/MyBA/actions";
const PaymentMethod = ({ modalData }) => {
  const { loan_id, is_full, is_down, amount} = modalData;
  const dispatch = useDispatch();
  const closePopUp = () => dispatch(handleModal({ modal: "", modalData: {} }));
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <button
              type="button"
              onClick={closePopUp}
              className="next-btn next-btn--rotate"
            >
              <GoToBackIcon />
            </button>
            <span className="popup__title">Payment method</span>
            <button onClick={closePopUp} className="popup__close" type="button">
              <ClosePopupIcon />
            </button>
          </div>
          <div className="popup__content">
            <PopUpContentItem
              fnOnClick={() => {
                dispatch(
                  handleModal({
                    modal: "PaymentCrypto",
                    modalData: { method: "plisio", ...modalData },
                  })
                );
              }}
              // title="Cryptocurrency (Save 40% off Finance Fee)"
              title="Cryptocurrency"
            >
              <img src="/images/content/payment.svg" alt="" />
            </PopUpContentItem>
            {/* <PopUpContentItem
              fnOnClick={() => {
                dispatch(
                  handleModal({
                    modal: "Confirm",
                    modalData: { method: "cash_app", ...modalData },
                  })
                );
              }}
              title="Cash App (Save 10% off Finance Fee)"
            >
              <img src="/images/content/pattern.png" alt="" />
            </PopUpContentItem> */}
            {/* <PopUpContentItem
              fnOnClick={() => {
                dispatch(
                  handleModal({
                    modal: "Confirm",
                    modalData: { method: "zelle", ...modalData },
                  })
                );
              }}
              title="Zelle"
            >
              <img src="/images/content/pattern.png" alt="" />
            </PopUpContentItem> */}
            {/* <PopUpContentItem
              fnOnClick={() => {
                dispatch(
                  getLoansDisplayAmount({
                    loan_id,
                    is_full,
                    payment_system: "stripe",
                  })
                );
                dispatch(
                  handleModal({
                    modal: "PaymentUsd",
                    modalData: { method: "stripe", ...modalData },
                  })
                );
              }}
              title="Credit/debit card (8% Fee)"
            >
              <img src="/images/content/pattern.png" alt="" />
            </PopUpContentItem> */}
            <PopUpContentItem
              fnOnClick={() => {
                // dispatch(
                //   getLoansDisplayAmount({
                //     loan_id,
                //     is_full,
                //     payment_system: "stripe",
                //   })
                // );
               
                dispatch(
                  loanPayUser(
                    {
                      loan_id,
                      payment_system: "cash_app",
                      is_full,
                      is_down,
                    },
                    "cash_app"
                  )
                );
                dispatch(
                  handleModal({
                    modal: "PopUpDebitCard",
                    modalData: { method: "stripe", ...modalData },
                  })
                );
              }}
              // title="Credit/debit card (8% Fee)"
              title="Debit Card"
            >
              <img src="/images/content/pattern.png" alt="" />
            </PopUpContentItem>
            {/* <PopUpContentItem
              fnOnClick={() => {
                dispatch(
                  handleModal({
                    modal: "Confirm",
                    modalData: { method: "bank_transfer", ...modalData },
                  })
                );
              }}
              title="Bank Transfers"
            >
              <img src="/images/content/pattern.png" alt="" />
            </PopUpContentItem> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentMethod;
