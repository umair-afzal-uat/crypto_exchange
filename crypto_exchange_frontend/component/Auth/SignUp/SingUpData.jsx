import { Form, Formik } from "formik";
import TextInput from "../../Base/TextInput/TextInput";
import NumberInput from "../../Base/TextInput/Numberinput";
import { useDispatch } from "react-redux";
import { setUser } from "./slice";
import { useRef } from "react";
import React, { useState, useEffect } from 'react'
import 'react-phone-input-2/lib/style.css'
import DatePickerField from "../../Base/DatePickerField/DatePickerField";
import { validationSchemaSingUp } from "../../../services/validation";
import { formatData, errorsMessage, warningMessage } from "../../../services/service";
import BtnAuth from "../../Base/Btn/BtnAuth/BtnAuth";
// import PhoneInput from 'react-phone-number-input';
import moment from "moment";
import { useRouter } from "next/router";
const SingUpData = ({ t }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nextStep = useRef(null);

useEffect(() => {
  if(!localStorage.getItem("referral")){
    localStorage.setItem("referral", router?.query?.referral);
  }
},[])
  return (
    <div className="swiper-slide">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          address: "",
          date_birth: "",
          city:"",
          state:"",
          zip:"",

        }}
        validationSchema={validationSchemaSingUp}
        onSubmit={(values, { setSubmitting }) => {
          var allow_submit = true;
          if (values.date_birth == null || values.date_birth == '') {
            allow_submit = false;
            warningMessage('Date of Birth is required');
          }
          else
          // if(values.date_birth != null && values.date_birth != '')
          {
            if (moment().diff(values.date_birth, 'years') < 18) {
              allow_submit = false;
              warningMessage('You must be atleast 18 years old to register');
            }
          }
          if (allow_submit == true) {
            setSubmitting(true);

            const dataFormat = values.date_birth
              ? { date_birth: formatData(values.date_birth, "YYYY-MM-DD") }
              : { date_birth: "" };
            const emailFormat = values.email.toLowerCase();
            const data = {
              ...values,
              ...dataFormat,
              email: values.email.toLowerCase().trim(),
              phone: ""+values.phone,
              zip: ""+values.zip
            };
            dispatch(setUser(data));
            nextStep.current.click();
          } TextInput
        }}
      >
        {({ isValid, values, errors }) => (

          <Form className="form auth__form">
            <TextInput
              label={t("auth:firstName")}
              name="first_name"
              type="text"
              placeholder={t("auth:firstNamePlaceholder")}
            />
            <TextInput
              label={t("auth:lastName")}
              name="last_name"
              type="text"
              placeholder={t("auth:lastPlaceholder")}
            />
            <TextInput
              label={t("auth:Email")}
              name="email"
              type="email"
              placeholder={t("auth:Enter your email address")}
            />
            <NumberInput
              label={t("auth:phone")}
              name="phone"
              type="number"
              placeholder={t("auth:phonePlaceholder")}
            />
            <TextInput
              label={t("auth:address")}
              name="address"
              type="text"
              placeholder={t("auth:addressPlaceholder")}
            />
            <TextInput
              label={t("auth:City")}
              name="city"
              type="text"
              placeholder={t("auth:Enter your city")}
            />
            <TextInput
              label={t("auth:State/Province")}
              name="state"
              type="text"
              placeholder={t("auth:Enter your state/province")}
            />
            <TextInput
              label={t("auth:Zip/Postal Code")}
              name="zip"
              type="text"
              placeholder={t("auth:Enter your zip/postal Code")}
            />
            <small className="info_text">(Only required if compleing payments with a debit card.)</small>
            <DatePickerField
              label={t("auth:dateBirth")}
              name="date_birth"
              placeholder={t("auth:dateBirthPlaceholder")}
            />
            <span ref={nextStep} className="nextStep" />
            <BtnAuth
              title={t("auth:next")}
              addClass="auth-slider__next"
              disabled={!isValid || !values.first_name}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SingUpData;
