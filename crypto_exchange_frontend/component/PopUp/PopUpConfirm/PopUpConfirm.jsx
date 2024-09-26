import GoToBackIcon from "../../Base/icon/GoToBackIcon";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import { useState } from "react";
import { loanPayUser } from "../../BitcoinAdvance/MyBA/actions";

const PopUpConfirm = ({ modalData }) => {
  const { is_full, loan_id, method,is_down } = modalData;
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  handleModal({
                    modal: "PaymentMethod",
                    modalData: { ...modalData },
                  })
                )
              }
              className="next-btn next-btn--rotate"
            >
              <GoToBackIcon />
            </button>
            <span className="popup__title">Confirm pay</span>
            <button
              onClick={() =>
                dispatch(handleModal({ modal: "", modalData: {} }))
              }
              className="popup__close"
              type="button"
            >
              <ClosePopupIcon />
            </button>
          </div>
          <div className="popup__content">
            <form className="form form--regular" action="">
              <div className="input">
                <label>
                  <div className="input-wrapper">
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      className="input-item input-item--textarea"
                      placeholder="Your comment"
                    />
                  </div>
                </label>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    loanPayUser(
                      {
                        loan_id,
                        payment_system: method,
                        is_full,
                        is_down,
                        message,
                      },
                      method
                    )
                  )
                }
                disabled={message?.length < 3 || message?.length > 500}
                className="button button--full-width"
                type="button"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopUpConfirm;
