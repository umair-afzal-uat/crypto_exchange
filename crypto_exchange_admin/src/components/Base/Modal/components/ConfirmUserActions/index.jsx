import { HandleModal } from '../../../../../redux/modal/actions';
import { useDispatch } from 'react-redux';
import { blockUser, deleteUser } from '../../../../../redux/users/action';

const ConfirmUserActions = ({ modalData }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  };
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <span className="popup__title" />
            <button onClick={closeModal} className="popup__close" type="button">
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
                />
                <path
                  d="M20 20L4 4"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="popup__content">
            <form className="form form--regular" action="">
              <div className="input">
                <label>
                  <p className="input__name input__name--bold input__name--center">
                    {modalData?.message}
                  </p>
                </label>
              </div>
              <div className="form__row form__row--center">
                <button
                  onClick={() => {
                    modalData?.type === 'blocked'
                      ? dispatch(blockUser(modalData?.id, modalData?.page))
                      : modalData?.type === 'delete'
                      ? dispatch(deleteUser(modalData?.id, modalData?.page))
                      : closeModal();
                    closeModal();
                  }}
                  className="button button--small-height"
                  type="button"
                >
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  className="button button--small-height"
                  type="button"
                >
                  No
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmUserActions;
