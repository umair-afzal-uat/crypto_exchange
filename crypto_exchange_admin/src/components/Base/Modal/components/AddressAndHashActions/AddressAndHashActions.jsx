import CloseIcon from '../../../Icon/CloseIcon';
import { HandleModal } from '../../../../../redux/modal/actions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { editAddressAndHashWithdrawals } from '../../../../../redux/withdrawals/action';
import { adAddressUser } from '../../../../../redux/users/action';
import { validate } from 'bitcoin-address-validation';

const AddressAndHashActions = ({ modalData }) => {
  const { title, subTitle, action, typeAction, id, value, page } = modalData;
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const closeModal = () => {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  };

  const validateData = (data, type) => {
    if (
      type === 'editAddress' ||
      type === 'editAddressGeneral' ||
      type === 'editAddressWaitList'
    ) {
      return validate(data);
    }
    if (type === 'editHash') {
      return data.length > 3 && data.length < 225;
    }
  };
  const addressActionUser = () =>
    dispatch(
      typeAction === 'editAddress'
        ? editAddressAndHashWithdrawals(id, { address: data })
        : typeAction === 'editHash'
        ? editAddressAndHashWithdrawals(id, { tx_hash: data })
        : typeAction === 'editAddressGeneral' ||
          typeAction === 'editAddressWaitList'
        ? adAddressUser(id, { address: data }, page, typeAction)
        : HandleModal({
            modal: '',
            modalData: '',
          }),
    );

  const send = event => {
    if (event.key === 'Enter') {

      addressActionUser();
    }
  };

  useEffect(() => {
    if (value) {
      setData(value);
    }
  }, []);

  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup popup--second-type">
          <div className="popup-header">
            <span className="popup-header__title">{title}</span>
            <button onClick={closeModal} className="popup__close" type="button">
              <CloseIcon />
            </button>
          </div>
          <div className="popup__content popup__content--padding">
            <div className="input">
              <label>
                <p className="input__name">{subTitle}</p>
                <div className="input-wrapper">
                  <input
                    // onKeyPress={send}
                    // autoFocus={true}
                    value={data}
                    onChange={event => setData(event.target.value.trim())}
                    className="input-item"
                    type="text"
                  />
                </div>
              </label>
            </div>
            <div className="popup__footer">
              <button
                onClick={closeModal}
                className="button button--type2 button--regular popup__footer-btn"
                type="button"
              >
                Cancel
              </button>
              <button
                // disabled={!validateData(data, typeAction)}
                onClick={addressActionUser}
                className="button button--regular popup__footer-btn"
                type="button"
              >
                {action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressAndHashActions;
