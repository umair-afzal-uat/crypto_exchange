import GoToBackIcon from "../../Base/icon/GoToBackIcon";
import ClosePopupIcon from "../../Base/icon/ClosePopupIcon";
import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import CardNumberIcon from "../../Base/icon/CardNumberIcon";
import { Form, Formik } from "formik";
import TextInputCreditCart from "../../Base/TextInput/TextInputCreditCart";
import { loanPayUser } from "../../BitcoinAdvance/MyBA/actions";
import { round } from "../../../services/service";
import { validationSchemaPay } from "../../../services/validation";
import { getLoansData } from "../../BitcoinAdvance/MyBA/slice";

const PaymentUsd = ({ modalData }) => {
  const { method, loan_id, is_full } = modalData;
  const { loansDisplayAmount } = useSelector(getLoansData);
  const dispatch = useDispatch();
  const closePopUp = () =>
    dispatch(handleModal({ modal: "", modalData: { ...modalData } }));
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="popup">
          <div className="popup__header">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  handleModal({
                    modal: "PaymentMethod",
                    modalData: { ...modalData },
                  })
                )
              }
              className="next-btn next-btn--rotate"
            >
              <GoToBackIcon />
            </button>
            <span className="popup__title">Payment delails</span>
            <button onClick={closePopUp} className="popup__close" type="button">
              <ClosePopupIcon />
            </button>
          </div>
          <div className="popup__content">
            <Formik
              initialValues={{
                name: "",
                number: "",
                date: "",
                cvc: "",
              }}
              validationSchema={validationSchemaPay}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);

                const payUsdData = {
                  loan_id,
                  payment_system: method,
                  is_full,
                  payerData: {
                    number: values?.number?.split(" ").join(""),
                    exp_month: values?.date?.slice(0, 2),
                    exp_year: values?.date?.slice(3, 7),
                    cvc: values?.cvc,
                  },
                };

                dispatch(loanPayUser(payUsdData, method));
              }}
            >
              {({ isValid, values, errors }) => (
                <Form className="form form--regular">
                  <TextInputCreditCart
                    label="Cardholder name"
                    type="text"
                    name="name"
                    placeholder="Cardholder name"
                  />
                  <TextInputCreditCart
                    typeData="cart"
                    addClass="input-item--left-icon"
                    label="Card Number"
                    type="text"
                    name="number"
                    placeholder="Card Number"
                  >
                    <div className="input-icon">
                      <CardNumberIcon />
                    </div>
                  </TextInputCreditCart>
                  <div className="form__group form__group--gap form__group--margin-none">
                    <TextInputCreditCart
                      typeData="date"
                      label="Date"
                      name="date"
                      type="text"
                      placeholder="MM/YYYY"
                    />
                    <TextInputCreditCart
                      label="CVV"
                      type="password"
                      name="cvc"
                      placeholder="CVV"
                    />
                  </div>
                  <button
                    className="button button--full-width button--small-height"
                    type="submit"
                    disabled={
                      !isValid ||
                      !values.name ||
                      !values.number ||
                      !values.date ||
                      !values.cvc
                    }
                  >
                    Pay{" "}
                    {loansDisplayAmount ? round(loansDisplayAmount, 2) : "0.00"}
                    USD
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentUsd;
