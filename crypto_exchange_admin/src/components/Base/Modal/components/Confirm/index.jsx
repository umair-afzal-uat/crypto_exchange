import { useDispatch } from "react-redux";
import { HandleModal } from "../../../../../redux/modal/actions";

const Confirm = ({ modalData }) => {
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
        <div className="popup">
          <div className="popup-header">
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
            <span className="popup-header__title popup-header__title--center">
              Are you sure?
            </span>
            <button
              className="button button--full-width button--small-height"
              type="button"
              onClick={() => modalData?.sendConfirm(modalData?.id)}
            >
              Yes
            </button>
            <button className="link link--green" type="button" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
