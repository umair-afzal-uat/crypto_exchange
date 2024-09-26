import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import PopUpContentItem from "../../Base/PopUpContentItem/PopUpContentItem";
import GoToBackIcon from "../../Base/icon/GoToBackIcon";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";

const PopUpOtherMethod = () => {
  const dispatch = useDispatch();
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <button
              type="button"
              onClick={() =>
                dispatch(handleModal({ modal: "Payment", modalData: {} }))
              }
              className="next-btn next-btn--rotate"
            >
              <GoToBackIcon />
            </button>
            <span className="popup__title">Pay with other method</span>
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
            <PopUpContentItem title="CashApp (save 10% off interest)">
              <img src="images/content/pattern.png" alt="" />
            </PopUpContentItem>
            <PopUpContentItem title="Zelle">
              <img src="images/content/pattern.png" alt="" />
            </PopUpContentItem>
            <PopUpContentItem title="Debit/Credit card (5% fee)">
              <img src="images/content/pattern.png" alt="" />
            </PopUpContentItem>
            <PopUpContentItem title="Bank Transfers">
              <img src="images/content/pattern.png" alt="" />
            </PopUpContentItem>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopUpOtherMethod;
