import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import { useEffect } from "react";
import GoToBackIcon from "../../Base/icon/GoToBackIcon";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";

const PopUpMessage = () => {
  const dispatch = useDispatch();
  const exitPopUp = () => dispatch(handleModal({ modal: "", modalData: {} }));

  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            {/*<button*/}
            {/*  type="button"*/}
            {/*  onClick={() =>*/}
            {/*    dispatch(handleModal({ modal: "Confirm", modalData: {} }))*/}
            {/*  }*/}
            {/*  className="next-btn next-btn--rotate"*/}
            {/*>*/}
            {/*  <GoToBackIcon />*/}
            {/*</button>*/}
            <span className="popup__title">Confirm pay</span>
            <button onClick={exitPopUp} className="popup__close" type="button">
              <ClosePopupIcon />
            </button>
          </div>
          <div className="popup__content">
            <div className="payment-message">
              <div className="payment-message__icon">
                <ClosePopupIcon />
              </div>
              <p className="payment-message__text">
                Managers will send an invoice for payment to the chatbot
              </p>
            </div>
            <div className="payment-message__footer">
              <button
                onClick={exitPopUp}
                className="button button--full-width"
                type="button"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopUpMessage;
