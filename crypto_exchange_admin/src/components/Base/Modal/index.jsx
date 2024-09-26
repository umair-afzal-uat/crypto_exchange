import { useSelector } from 'react-redux';
import Confirm from './components/Confirm';
import ConfirmLogin from './components/ConfirmLogin';
import Reject from './components/Reject';
import Deposit from './components/Deposit';
import ChangeTransaction from './components/ChangeTransaction';
import ConfirmUserActions from './components/ConfirmUserActions';
import WalletsReject from './components/Wallets/WalletsReject';
import WalletsRejectMessage from './components/Wallets/WalletsRejectMessage';
import AddressAndHashActions from './components/AddressAndHashActions/AddressAndHashActions';
import StaffNameActions from './components/StaffNameActions/StaffNameActions';
import PaymentInfoStatus from './components/PaymentInfoStatus/PaymentInfoStatus';
import FaqAdd from './components/Faqs/index';

const Modal = () => {
  const { modal, modalData } = useSelector(state => state.modal);
  const render = {
    ConfirmLogin: <ConfirmLogin modalData={modalData} />,
    Confirm: <Confirm modalData={modalData} />,
    Reject: <Reject modalData={modalData} />,
    Deposit: <Deposit modalData={modalData} />,
    ChangeTransaction: <ChangeTransaction modalData={modalData} />,
    UserActions: <ConfirmUserActions modalData={modalData} />,
    WalletsReject: <WalletsReject modalData={modalData} />,
    WalletsRejectMessage: <WalletsRejectMessage modalData={modalData} />,
    AddressAndHashActions: <AddressAndHashActions modalData={modalData} />,
    StaffNameActions: <StaffNameActions modalData={modalData} />,
    PaymentInfoStatus: <PaymentInfoStatus modalData={modalData} />,
    // FaqAdd: <FaqAdd modalData={modalData} />,
  };

  return <>{render[modal]}</>;
};

export default Modal;
