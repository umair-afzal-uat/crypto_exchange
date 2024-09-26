import CloseIcon from '../../../Icon/CloseIcon';
import { HandleModal } from '../../../../../redux/modal/actions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { editPaymentStatus, getPaymentInfo } from '../../../../../redux/transactions/action';

import { adAddressUser } from '../../../../../redux/users/action';
import { validate } from 'bitcoin-address-validation';
import Select from 'react-select';


const PaymentInfoStatus = ({ modalData }) => {
    const { title, subTitle, action, typeAction, id, value, page, slug } = modalData;
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

    useEffect(() => {
        setData(value)
    }, [])


    let statusOptions = [
        // { label: "Processing", value: 'processing' },
        // { label: "Admin Check", value: 'admin_check' },
        { label: "Completed", value: 'completed' },
        { label: "Failed", value: 'canceled' },
        // { label: "Waiting User", value: 'waiting_user' },
        // { label: "Waiting Admin", value: 'waiting_admin' },
    ]

    const paymentInfoStatusMethod = () => {
        let payload = {
            payment_id: id,
            status: data
        }
        dispatch(editPaymentStatus(payload));
        dispatch(getPaymentInfo(slug));

    }

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
                                    <Select
                                        className="custom-select-holder"
                                        classNamePrefix="react-select"
                                        placeholder="Choose Status"
                                        options={statusOptions}
                                        onChange={option => setData(option.value)}
                                        value={statusOptions.filter(option => option.value === data)}
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="popup__footer">
                            <button
                                onClick={closeModal}
                                className="button button--type2 button--regular popup__footer-btn cancel-button"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={paymentInfoStatusMethod}
                                className="button button--regular popup__footer-btn"
                                type="button "
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

export default PaymentInfoStatus;
