import AffiliateNotificationCloseIcon from "../../Base/icon/AffiliateNotificationCloseIcon";
import { handleModal } from "../../Base/Modal/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const InvalidCod = () => {
  const dispatch = useDispatch();
  const exitPopUp = () =>
    dispatch(handleModal({ modal: "ConfirmCod", modalData: {} }));
  useEffect(() => {
    const timer = setTimeout(exitPopUp, 1500);
    return () => clearTimeout(timer);
  });

  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <span className="popup__title" />
            <button onClick={exitPopUp} className="popup__close" type="button">
              <AffiliateNotificationCloseIcon />
            </button>
          </div>
          <div className="popup__content">
            <form className="form form--regular" action="">
              <div className="input">
                <label>
                  <p className="input__name input__name--bold">
                    You entered invalid code
                  </p>
                </label>
              </div>
              <button
                onClick={exitPopUp}
                className="button button--full-width button--small-height"
                type="button"
              >
                Ok
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InvalidCod;
