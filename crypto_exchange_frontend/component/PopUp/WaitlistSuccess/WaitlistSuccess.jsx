import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { useDispatch } from "react-redux";
import WaitListIcon from "../../Base/icon/WaitListIcon";
import { handleModal } from "../../Base/Modal/slice";
import { useRouter } from "next/router";

const WaitListSuccess = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup popup--v-big">
        <button
              onClick={() => {
                dispatch(handleModal({ modal: "", modalData: {} }));
                router.push("/myWallet");
              }}
              className="popup__close popup__close--absolute"
              type="button"
            >
              <ClosePopupIcon />
            </button>
          <div className="popup-header popup-header--center">
            <div className="popup__img">
              <WaitListIcon />
            </div>
          <br></br>
          </div>
          <div className="popup__content popup__content--center">
            <p className="popup__text">
              You are now on the waitlist. <br />
              Thank You!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitListSuccess;
