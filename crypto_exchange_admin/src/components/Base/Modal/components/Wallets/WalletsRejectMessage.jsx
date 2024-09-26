import { useState } from 'react';
import CloseIcon from '../../../Icon/CloseIcon';
import { HandleModal } from '../../../../../redux/modal/actions';
import { useDispatch } from 'react-redux';
import { rejectNewLoan } from '../../../../../redux/users/action';

const WalletsRejectMessage = ({ modalData }) => {
  const { id, page } = modalData;
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup popup--second-type">
          <div className="popup-header">
            <button
              onClick={() => {
                dispatch(
                  HandleModal({
                    modal: '',
                    modalData: '',
                  }),
                );
              }}
              className="popup__close"
              type="button"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="popup__content popup__content--padding">
            <div className="input">
              <label>
                <p className="input__name">Reasons for cancellation</p>
                <div className="input-wrapper">
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="input-item input-item--textarea"
                    placeholder="Message"
                  />
                </div>
              </label>
            </div>
            <div className="popup__footer">
              <button
                disabled={
                  !message || message?.length < 1 || message?.length > 225
                }
                onClick={() => dispatch(rejectNewLoan(id, page, message))}
                className="button button--regular popup__footer-btn"
                type="button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsRejectMessage;
