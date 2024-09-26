import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import PaymentMethod from "../../PopUp/PaymentMethod/PaymentMethod";
import { getModalState } from "./slice";
import PopUpOtherMethod from "../../PopUp/PopUpOtherMethod/PopUpOtherMethod";
import PreLoader from "../../PopUp/PreLoader/PreLoader";
import Code from "../../PopUp/ConfirmCode/Code";
import PopUpErrorAuth from "../../PopUp/PopUpErrorAuth/PopUpErrorAuth";
import InvalidCod from "../../PopUp/ConfirmCode/InvalidCod";
import PopUpConfirm from "../../PopUp/PopUpConfirm/PopUpConfirm";
import PaymentUsd from "../../PopUp/PaymentUsd/PaymentUsd";
import PopUpCode2Fa from "../../PopUp/PopUpCode2Fa/PopUpCode2Fa";
import WithdrawalActive from "../../PopUp/PopUpWithdrawal/WithdrawalActive";
import WithdrawalSuccess from "../../PopUp/PopUpWithdrawal/WithdrawalSuccess";
import PopUpMessage from "../../PopUp/PopUpMessage/PopUpMessage";
import PaymentCrypto from "../../PopUp/PaymentCrypto/PaymentCrypto";
import JoinWaitList from "../../PopUp/JoinWaitList/JoinWaitlist";
import WaitListSuccess from "../../PopUp/WaitlistSuccess/WaitlistSuccess";
import PopUpDebitCard from "../../PopUp/PopUpDebitCard/PopUpDebitCard";
import Delete from "../../PopUp/PaymentMethod/Delete";



const Modal = () => {
  const { modal, modalData } = useSelector(getModalState);
  const toggleClass = useCallback((isAdd) => {
    const element = document.body;
    if (element && element?.classList && element?.classList?.toggle) {
      element.classList.toggle("popup-open", isAdd);
    }
  }, []);

  useEffect(() => {
    if (modal) {
      toggleClass(true);
    } else {
      toggleClass(false);
    }
  }, [modal]);

  const render = {
    PaymentMethod: <PaymentMethod modalData={modalData} />,
    Delete:<Delete  modalData={modalData} />,
    PaymentUsd: <PaymentUsd modalData={modalData} />,
    OtherMethod: <PopUpOtherMethod modalData={modalData} />,
    Preloader: <PreLoader />,
    ConfirmCod: <Code />,
    ErrorAuth: <PopUpErrorAuth modalData={modalData} />,
    InvalidCod: <InvalidCod />,
    Confirm: <PopUpConfirm modalData={modalData} />,
    Code2FA: <PopUpCode2Fa />,
    Message: <PopUpMessage />,
    WithdrawalActive: <WithdrawalActive modalData={modalData} />,
    WithdrawalSuccess: <WithdrawalSuccess />,
    PaymentCrypto: <PaymentCrypto modalData={modalData} />,
    JoinWaitList: <JoinWaitList modalData={modalData} />,
    WaitListSuccess: <WaitListSuccess />,
    PopUpDebitCard: <PopUpDebitCard  modalData={modalData}/>,
  };

  return <>{render[modal]}</>;
};

export default Modal;
