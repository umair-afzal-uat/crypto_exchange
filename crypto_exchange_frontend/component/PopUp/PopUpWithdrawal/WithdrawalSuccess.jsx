import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { handleModal } from "../../Base/Modal/slice";
import { useDispatch } from "react-redux";
import WithdrawalIcon from "../../Base/icon/WithdrawalIcon";

const WithdrawalSuccess = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(handleModal({ modal: "", modalData: {} }));
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup popup--big">
          <div className="popup__header">
            <span className="popup__title">Success!</span>
            <button onClick={closeModal} className="popup__close" type="button">
              <ClosePopupIcon />
            </button>
          </div>
          <div className="popup__content">
            <div className="payment-message">
              <div className="payment-message__icon">
                <WithdrawalIcon />
              </div>
              <p className="payment-message__text">
              Your withdraw is pending approval and will be available shortly.
              </p>
            </div>
            <div className="payment-message__footer">
              <button
                onClick={closeModal}
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
export default WithdrawalSuccess;
