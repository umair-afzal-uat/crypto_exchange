import { useState } from "react";
import { useDispatch } from "react-redux";
import { HandleModal } from "../../../../../redux/modal/actions";

const Deposit = ({ modalData }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      HandleModal({
        modal: "",
        modalData: "",
      })
    );
  };

  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup popup--second-type">
          <div className="popup-header">
            <span className="popup-header__title">Deposit</span>
            <button className="popup__close" type="button" onClick={closeModal}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-darkreader-inline-fill=""
                style={{ "--darkreader-inline-fill": "none" }}
              >
                <path
                  d="M4 20L20 4"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-darkreader-inline-stroke=""
                  style={{ "--darkreader-inline-stroke": "#ffffff" }}
                ></path>
                <path
                  d="M20 20L4 4"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-darkreader-inline-stroke=""
                  style={{ "--darkreader-inline-stroke": "#ffffff" }}
                ></path>
              </svg>
            </button>
          </div>
          <div className="popup__content">
            <div className="param-list">
              <div className="param-list__item param-item">
                {" "}
                <span className="param-item__title">Address</span>
                <span className="param-item__desc">{modalData.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
