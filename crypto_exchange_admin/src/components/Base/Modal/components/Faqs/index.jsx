import CloseIcon from '../../../Icon/CloseIcon';
import { HandleModal } from '../../../../../redux/modal/actions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addFaq, updateFaq, getFaqs } from '../../../../../redux/faqs/actions';
import { validate } from 'bitcoin-address-validation';

const FaqAdd = ({ modalData }) => {

  const { title, question, answer, displayOrder, status, action, faqData } = modalData;
  const dispatch = useDispatch();
  const [ques, setQuestion] = useState('');
  const [ans, setAnswer] = useState('');
  const [disOrder, setDisplayOrder] = useState('');
  const [sta, setStatus] = useState();
  const closeModal = () => {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  };

  useEffect(() => {
    if (faqData) {
      setQuestion(faqData.question)
      setAnswer(faqData.answer)
      setDisplayOrder(faqData.display_order)
      setStatus(faqData.status)
    }
  }, [faqData])




  const addActionFaq = () => {
  let payload = {
    question: ques,
    answer: ans,
    display_order: disOrder,
    status: sta
  };
    dispatch(addFaq(payload));
    dispatch(getFaqs());
  }
  const updateFaqMethod = () => {
    let payload = {
      id: faqData.id,
      question: ques,
      answer: ans,
      display_order: disOrder, status: sta
    }
    dispatch(updateFaq(payload));
    dispatch(getFaqs());
  }


  const send = event => {
    if (event.key === 'Enter') {

      // addActionFaq();
    }
  };
  const statusRecord = event => {

    let v = event.target.checked == true ? 1 : 0;
    setStatus(v);
  };

  // useEffect(() => {
  //   if (value) {

  //     setQuestion(value);
  //     setAnswer(value);
  //     setDisplayOrder(value);
  //     setStatus(value);
  //   }
  // }, [value]);

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
                <p className="input__name">{question}</p>
                <div className="input-wrapper">
                  <input
                    onKeyPress={send}
                    autoFocus={true}
                    value={ques}
                    onChange={event => setQuestion(event.target.value)}
                    className="input-item"
                    type="text"
                  />
                </div>
              </label>
            </div>
            <div className="input">
              <label>
                <p className="input__name">{answer}</p>
                <div className="input-wrapper">

                  <textarea onKeyPress={send}
                    autoFocus={true}
                    value={ans}
                    onChange={event => setAnswer(event.target.value)}
                    className="input-item" rows="10" cols="50"></textarea>
                </div>
              </label>
            </div>
            <div className="input">
              <label>
                <p className="input__name">{displayOrder}</p>
                <div className="input-wrapper">
                  <input
                    onKeyPress={send}
                    autoFocus={true}
                    value={disOrder}
                    onChange={event => setDisplayOrder(event.target.value)}
                    className="input-item"
                    type="number"
                  />
                </div>
              </label>
            </div>
            <div className="input">
              <label>
                <p className="input__name">{status}</p>
                <div className="input-wrapper">
                  <input
                    onKeyPress={send}
                    autoFocus={true}
                    value={sta}
                    onChange={statusRecord}
                    className=""
                    type="checkbox"
                    defaultChecked={sta}

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
                onClick={faqData ? updateFaqMethod : addActionFaq}
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

export default FaqAdd;
