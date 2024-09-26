import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import Link from "next/link";

const PopUpDebitCard = ({ modalData }) => {
  const { is_down, amount, is_full,total,remaining} = modalData;
  const dispatch = useDispatch();
  const exitPopUp = () => dispatch(handleModal({ modal: "", modalData: {} }));
  const openWidget = () => {
    // setFasp(true);

   // window?.LC_API?.open_chat_window();
   window.open('https://chatting.page/y6glh7zejhc0381ant6qembe5lo8ruk2','Chat with us','width=1000,height=700');
    // this.livechat.hide_chat_window();
  };
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <span className="popup__title">{ is_full == 0 ? <>Pay ${amount} <br/></> : is_full== 1 ?<>Pay ${total-remaining}<br/></>:""} Debit Card<br/></span>
            <button onClick={exitPopUp} className="popup__close" type="button">
              <ClosePopupIcon />
            </button>
          </div>
          <div className="popup__content">
            <div className="payment-message">
              <p className="payment-message__text">
                {is_full == 0 ? 
                <>
                  {is_down == 1 ? 
                    <>
                    A member of our staff  will assist you with setting up your account for Debit Card payments.  Please note that to complete a Debit Card transaction your debit card information must be updated in your crypto exchange profile. Please make sure you have updated this information before continuing to live chat to complete payment. 
                    </>
                    :
                    <>
                    If you opted to pay your down payment or a previous payment via debit card your account is already enrolled in auto payments.  If you need to update your debit card please add the new card in your account settings.  If payment is due within 3 days please contact customer support via email or chat to ensure that new card is billed.
                    <br/><br/>If this is your first time paying via debit card a member of our staff will assist you with setting up your account for Debit Card payments. Please note that to complete a Debit Card transaction your debit card information must be updated in your crypto exchange profile. Please make sure you have updated this information before continuing to live chat to complete payment.

                    </>
                  }
                </> 
                :
                <>A member of our staff will assist you with completing your final payment.  If you have opted to pay any previous payments via debit card, we will use the same card on file to complete your Pay in Full payment.  If you’d like to use a different debit card, please update your debit card in your account settings before continuing to live chat to complete final payment.</>
                }
              </p>
            </div>
            <div className="payment-message__footer">
              {/* <button
                onClick={exitPopUp}
                className="button button--full-width"
                type="button"
              >
                Ok
              </button> */}
               <Link href="/accountSettings">
                <button onClick={exitPopUp} type="button" className="button ">
                  Profile
                </button>
              </Link>
              <button  type="button" onClick={openWidget} className="button button--second-green wallet-detail__btn" style={{float: "right"}}>
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopUpDebitCard;
