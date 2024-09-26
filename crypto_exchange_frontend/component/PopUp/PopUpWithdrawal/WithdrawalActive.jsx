import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import { useState, useEffect } from "react";
import { amountFormat, round } from "../../../services/service";
import classNames from "classnames";
import { getWithdrawalUser } from "../../BitcoinAdvance/MyBA/actions";
import { validate } from "bitcoin-address-validation";

const WithdrawalActive = ({ modalData }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    // if (!Cookies.get(constants.jwtToken)) {
      setAmount(modalData?.data);
      // router.push("/logIn");
    // }
  }, []);
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup popup--biggest">
          <div className="popup__header">
            <span className="popup__title">Withdrawal</span>
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
              <div
                className={classNames("input", {
                  "input--error": amount > modalData?.data,
                })}
              >
                <label>
                  <p className="input__name input__name--small">Amount</p>
                  <div className="input-wrapper">
                    <input
                      className="input-item input-item--small input-item--right-icon"
                      type="text"
                      readOnly
                      placeholder="Amount"
                      value={modalData?.data}
                      maxLength={10}
                      onChange={(event) =>
                        setAmount(amountFormat(event.target.value))
                      }
                    />
                  </div>
                </label>
              </div>
              <div className="input">
                <label>
                  <p className="input__name input__name--small">
                  BTC Wallet address
                  </p>
                  <div className="input-wrapper">
                    <input
                      className="input-item input-item--small"
                      type="text"
                      value={address}
                      onChange={(event) =>
                        setAddress(event.target.value.trim())
                      }
                      placeholder="Address"
                    />
                  </div>
                </label>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    getWithdrawalUser({
                      address,
                      amount: round(amount, 8),
                    })
                  )
                }
                disabled={
                  // !validate(address) ||
                  !address ||
                  !amount ||
                  amount > modalData?.data ||
                  amount < modalData?.min_withdraw
                }
                className="button button--full-width button--small-height"
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
export default WithdrawalActive;
