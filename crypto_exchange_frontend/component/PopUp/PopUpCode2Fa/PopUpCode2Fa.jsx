import AffiliateNotificationCloseIcon from "../../Base/icon/AffiliateNotificationCloseIcon";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState } from "../../Auth/logIn/slice";
import { LogInUsers } from "../../Auth/logIn/actions";
import { useState } from "react";
import { handleModal } from "../../Base/Modal/slice";

const PopUpCode2Fa = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { dataLogin } = useSelector(getLoginState);
  const login2fa = () => {
    if (code.length === 6) {
      dispatch(LogInUsers({ ...dataLogin, totp: code }));
    }
  };
  const login2faKey = (event) => {
    if (event.key === "Enter" && code.length === 6) {
      dispatch(LogInUsers({ ...dataLogin, totp: code }));
    }
  };

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
                  <p className="input__name input__name--small">Code 2FA</p>
                  <div className="input-wrapper">
                    <input
                      value={code}
                      onKeyPress={login2faKey}
                      onChange={(e) => setCode(event.target.value)}
                      className="input-item input-item--small"
                      type="text"
                      placeholder="Code"
                    />
                  </div>
                </label>
              </div>
              <button
                onClick={login2fa}
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
export default PopUpCode2Fa;
