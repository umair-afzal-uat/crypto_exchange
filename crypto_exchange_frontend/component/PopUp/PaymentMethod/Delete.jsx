import GoToBackIcon from "../../Base/icon/GoToBackIcon";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import PopUpContentItem from "../../Base/PopUpContentItem/PopUpContentItem";
import { getLoansDisplayAmount } from "../../BitcoinAdvance/MyBA/actions";
import { useEffect } from "react";
import { getDataUsers } from "../../AccountSettings/actions";
import { loanPayUser } from "../../BitcoinAdvance/MyBA/actions";
import { DeleteLoan } from "../../BitcoinAdvance/MyBA/actions";

import loans from "../../../services/api";

const Delete = ({ modalData }) => {

  const { loan_id, is_full, is_down, amount} = modalData;
  const dispatch = useDispatch();
  const closePopUp = () => dispatch(handleModal({ modal: "", modalData: {} }));
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <span className="popup__title">Do you really want to delete?</span>
            <button onClick={closePopUp} className="popup__close" type="button">
              <ClosePopupIcon />
            </button>
          </div>
          <div className="payment-delete">
          <button onClick={() => {dispatch(DeleteLoan(loan_id)); dispatch(handleModal({ modal: "", modalData: {} }))}}
          className="button button--second-red delete-button"
          >
          Yes
          </button>
          <button
          onClick={closePopUp}
          className="button button--delete-green wallet-detail__btn"
          >
          No
          </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};
export default Delete;
