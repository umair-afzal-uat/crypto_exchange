import AffiliateNotificationCloseIcon from "../../Base/icon/AffiliateNotificationCloseIcon";
import { handleModal } from "../../Base/Modal/slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logInConfirmUsers } from "../../Auth/logIn/actions";
import { getLoginState } from "../../Auth/logIn/slice";

const Code = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { dataLogin } = useSelector(getLoginState);
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <span className="popup__title">Code</span>
            <button
              onClick={() =>
                dispatch(handleModal({ modal: "", modalData: {} }))
              }
              className="popup__close"
              type="button"
            >
              <AffiliateNotificationCloseIcon />
            </button>
          </div>
          <div className="popup__content">
            <form className="form form--regular" action="">
              <div className="input">
                <label>
                  <p className="input__name input__name--small">Code</p>
                  <div className="input-wrapper">
                    <input
                      value={code}
                      onChange={(e) => setCode(event.target.value.trim())}
                      className="input-item input-item--small"
                      type="text"
                      placeholder="Code"
                    />
                  </div>
                </label>
              </div>
              <button
                onClick={() =>
                  dispatch(logInConfirmUsers({ code: code }, dataLogin))
                }
                className="button button--full-width button--small-height"
                type="button"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Code;
