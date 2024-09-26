import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HandleModal } from "../../../../../redux/modal/actions";
import { changeTransaction } from "../../../../../redux/transactions/action";

const ChangeTransaction = ({ modalData }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(`${modalData?.amount}`);
  const [error, setError] = useState("");
  const closeModal = () => {
    dispatch(
      HandleModal({
        modal: "",
        modalData: "",
      })
    );
  };
  const handleSetValue = (e) => {
    setValue(e.target.value);
    if (e.target?.value?.trim()?.length === 6) {
      setError("");
    }
  };
  const validation = () => {
    if (!value?.trim()?.length) {
      setError("Enter the amount");
    }
    // else if (value?.trim()?.length < 6) {
    //   setError("The password is short, must be 6 characters long");
    //   return false;
    // } else if (value?.trim()?.length > 6) {
    //   setError("The password is long, must be 6 characters long");
    //   return false;
    // }
    else {
      setError("");
      return true;
    }
  };
  const send = () => {
    if (!validation()) return;
    const body = { payment_id: modalData?.id, amount: +value, currency: "usd" };
    dispatch(changeTransaction(body, modalData.getData));
  };
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup-header">
            <span className="popup-header__title">Payment delails</span>
            <button className="popup__close" type="button" onClick={closeModal}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 20L20 4"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M20 20L4 4"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div className="popup__content">
            <form className="form form--regular" action="">
              <div className={`input ${error && "input--error"}`}>
                <label>
                  <p className="input__name input__name--small">New amount</p>
                  <div className="input-wrapper">
                    <input
                      className="input-item "
                      type="number"
                      placeholder="New amount"
                      value={value}
                      onChange={handleSetValue}
                    />
                  </div>
                </label>
                {error && <p className="input__notification">{error}</p>}
              </div>
              <button
                className="button button--full-width button--small-height"
                type="button"
                onClick={send}
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

export default ChangeTransaction;
