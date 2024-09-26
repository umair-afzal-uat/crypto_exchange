import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import WaitListIcon from "../../Base/icon/WaitListIcon";
import { takeLoanUserisQueued } from "../../BitcoinAdvance/BABase/actions";

const JoinWaitList = ({ modalData }) => {
  const { loansData } = modalData;
  const dispatch = useDispatch();
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup popup--v-big">
        <button
        onClick={() => dispatch(handleModal({ modal: "", modalData: {} }))}
        className="popup__close popup__close--absolute"
        type="button"
      >
        <ClosePopupIcon />
      </button>
          <div className="popup-header popup-header--center">
            <div className="popup__img">
              <WaitListIcon />
            </div>
          </div>
          <div className="popup__content popup__content--center">
            <span className="popup__title popup__title--second-type">
              The BTC Advance team is busy originating new loans and providing
              excellent customer service to our BTC Advance network.{" "}
            </span>
            <p className="popup__text">
              Join our wait list now to be next in line to complete your BTC
              advance. Be on the lookout for an email when our team is ready to
              begin processing loans. Once our waitlist is open advances are
              provided first come first serve. We look forward to processing
              your advance.{" "}
            </p>
            <button
              onClick={() => dispatch(takeLoanUserisQueued(loansData))}
              className="button popup__btn"
              type="button"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinWaitList;
