import AffiliateNotificationCloseIcon from "../../Base/icon/AffiliateNotificationCloseIcon";
import { handleModal } from "../../Base/Modal/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const PopUpErrorAuth = ({ modalData }) => {
  const dispatch = useDispatch();
  const setDelay = modalData?.delay || 3000;
  const exitPopUp = () => dispatch(handleModal({ modal: "", modalData: {} }));
  useEffect(() => {
    const timer = setTimeout(exitPopUp, setDelay);
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
                    {modalData?.message}
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
export default PopUpErrorAuth;
