import { HandleModal } from '../../../../../redux/modal/actions';
import { useDispatch } from 'react-redux';

const WalletsReject = ({ modalData }) => {
  const dispatch = useDispatch();
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__content popup__content--center">
            <span className="popup__title">
              Are you sure you want to reject?
            </span>
            <button
              onClick={() => {
                dispatch(
                  HandleModal({
                    modal: '',
                    modalData: '',
                  }),
                );
              }}
              className="button popup__btn popup__btn--second-type"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(
                  HandleModal({
                    modal: 'WalletsRejectMessage',
                    modalData: modalData,
                  }),
                );
              }}
              className="link link--green link--margin"
              type="button"
            >
              Yes, I’m sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsReject;
