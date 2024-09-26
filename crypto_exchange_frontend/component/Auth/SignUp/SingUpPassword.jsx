import ChekcIcon from "../../Base/icon/ChekcIcon";
import { Form, Formik } from "formik";
import PasswordInput from "../../Base/PasswordInput/PasswordInput";
import CheckboxInput from "../../Base/CheckboxInput/CheckboxInput";
import React, { useState } from "react";
import { validationSchemaConfirmPass } from "../../../services/validation";
import { useDispatch, useSelector } from "react-redux";
import ReCaptchaGoogle from "../../ReCaptchaGoogle/ReCaptchaGoogle";
import { singUpUsers } from "./actions";
import BtnAuth from "../../Base/Btn/BtnAuth/BtnAuth";
import { useRouter } from "next/router";
import TextInput from "../../Base/TextInput/TextInput";
import TextInputCreditCart from "../../Base/TextInput/TextInputCreditCart";
import moment from "moment";
import DatePickerField from "../../Base/DatePickerField/DatePickerField";
const SingUpPassword = ({ t }) => {
  const dispatch = useDispatch();
  const [tokenCaptcha, setTokenCaptcha] = useState(null);
  const { user } = useSelector((state) => state.users);
  const router = useRouter();
  const userData = Object.fromEntries(
    Object.entries(user).filter(([_, v]) => v !== "")
  );
  return (
    <div className="swiper-slide">
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          debit_card_number: "",
          debit_card_expiry_date: "",
          debit_card_sec_number: "",
          social_security_number: "",
          confirm_social_security_number: "",
          conditions: false,
        }}
        validationSchema={validationSchemaConfirmPass}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          const data = {
            ...userData,
            password: values.password,
            debit_card_number: values.debit_card_number,
            debit_card_expiry_date: values.debit_card_expiry_date,
            debit_card_sec_number: values.debit_card_sec_number,
            social_security_number: values.social_security_number,
          };
          if (router?.query?.referral) {
            await dispatch(
              singUpUsers({ ...data, referral: router?.query?.referral })
            );
          } 
          else if(localStorage.getItem("referral") && localStorage.getItem("referral") != "undefined" ){
            await dispatch(
              singUpUsers({ ...data, referral: localStorage.getItem("referral")})
            );
          }
          else {
            await dispatch(singUpUsers(data));
          }
        }}
      >
        {({ isValid, values }) => (
          <Form className="form auth__form">
            <TextInputCreditCart
              typeData="cart"
              label={t("auth:debitCardNumber")}
              name="debit_card_number"
              type="text"
              placeholder={t("auth:debitCardNumberPlaceholder")}
            />
            <small className="info_text">(Only required if compleing payments with a debit card.)</small>
            <DatePickerField
              typeData="date"
              label={t("auth:debitCardExpiryDate")}
              name="debit_card_expiry_date"
              type="date"
              placeholder={t("auth:debitCardExpiryDatePlaceholder")}
              minDate={new Date}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <TextInput
              label={t("auth:debitCardSecNumber")}
              name="debit_card_sec_number"
              type="text"
              placeholder={t("auth:debitCardSecNumberPlaceholder")}
              maxlength="3"
            />
            <TextInputCreditCart
              typeData="socialsecuritynumber"
              label={t("auth:socialSecurityNumber")}
              name="social_security_number"
              type="text"
              placeholder={t("auth:socialSecurityNumberPlaceholder")}
            />
            <small className="info_text">(Only required if compleing payments with a debit card.)</small>
            <TextInputCreditCart
              typeData="socialsecuritynumber"
              label={t("auth:confirmSocialSecurityNumber")}
              name="confirm_social_security_number"
              type="text"
              placeholder={t("auth:confirmSocialSecurityNumberPlaceholder")}
            />
            {
              (values.confirm_social_security_number != values.social_security_number)
                ?
                <small style={{ color: "red" }}>Social Security number must match</small>

                : ''}
            <PasswordInput
              label={t("auth:password")}
              name="password"
              placeholder={t("auth:passwordPlaceholder")}
              notify={
                <div className="input-notify input">
                  <span className="notify__char">*</span>
                  <span className="input-notify__text">
                    {t("auth:passwordValidate")}
                  </span>
                </div>
              }
              errorMessage={
                <div style={{ color: "red" }} className="input-notify input">
                  <span className="notify__char">*</span>
                  <span style={{ color: "red" }} className="input-notify__text">
                    {t("auth:passwordValidate")}
                  </span>
                </div>
              }
            />
            <PasswordInput
              label={t("auth:confirmPassword")}
              name="confirmPassword"
              placeholder={t("auth:confirmPasswordPlaceholder")}
            />
            <div className="captcha">
              <ReCaptchaGoogle isToken={(value) => setTokenCaptcha(value)} />
            </div>
            <div className="checkbox">
              <label className="checkbox__label">
                <CheckboxInput name="conditions" />
                <div className="checkbox__item">
                  <span className="checkbox__item-icon">
                    <ChekcIcon />
                  </span>
                </div>
                <p className="checkbox__text">
                  {t("auth:checkedLabel")}{" "}
                  <a href="/termsOfService" target="_blank">{t("auth:termsConditions")}</a>{" "}{t("auth:and")}{" "}
                  <a href="/privacyPolicy" target="_blank">{t("auth:privacyPolicy")}</a>{" "}
                  {/* <a href="/">{t("auth:amlPolicy")}</a>. */}
                </p>
              </label>
            </div>
            <BtnAuth
              title="Sign Up"
              //disabled={!isValid || !tokenCaptcha || !values.password || values.confirm_social_security_number != values.social_security_number }
              disabled={!isValid || !tokenCaptcha ||   !values.password || values.confirm_social_security_number != values.social_security_number}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SingUpPassword;
