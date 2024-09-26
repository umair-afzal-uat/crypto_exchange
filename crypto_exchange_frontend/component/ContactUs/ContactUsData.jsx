import React, { useState } from "react";
import TextInput from "../Base/TextInput/TextInput";
import TextAreaInput from "../Base/TextAreaInput/TextAreaInput";
import ReCaptcha from "react-google-recaptcha";
import { validationSchemaContactUs } from "../../services/validation";
import { Form, Formik } from "formik";
import { sendEmailUsers } from "./actions";
import { useDispatch } from "react-redux";
import constants from "../../services/constants";

const ContactUsData = ({ t }) => {
  const [tokenCaptcha, setTokenCaptcha] = useState(null);
  let captcha;
  const dispatch = useDispatch();
  const setCaptchaRef = (ref) => {
    if (ref) {
      return (captcha = ref);
    }
  };
  const resetCaptcha = () => {
    captcha.reset();
  };
  return (
    <div className="contact-us__side contact-us__right">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={validationSchemaContactUs}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(sendEmailUsers({ ...values }));
          resetForm({});
          setTokenCaptcha(null);
          resetCaptcha();
        }}
      >
        {({ isValid, values }) => (
          <Form className="form form--regular contact-us__form">
            <TextInput
              label={t("contactUs:form.fullName")}
              name="fullName"
              type="text"
              placeholder={t("contactUs:form.fullNamePlaceholder")}
            />
            <TextInput
              label={t("contactUs:form.email")}
              name="email"
              type="email"
              placeholder={t("contactUs:form.emailPlaceholder")}
            />
            <TextInput
              label={t("contactUs:form.phone")}
              name="phone"
              type="Number"
              placeholder={t("contactUs:form.phonePlaceholder")}
            />

            <TextAreaInput
              label={t("contactUs:form.message")}
              name="message"
              placeholder={t("contactUs:form.messagePlaceholder")}
            />
            <div className="captcha">
              <ReCaptcha
                sitekey={constants.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(value) => setTokenCaptcha(value)}
                ref={(r) => setCaptchaRef(r)}
              />
            </div>
            <div className="form__footer">
              <button
                disabled={!isValid || !values.fullName || !tokenCaptcha}
                className="button button--regular contact-us__send"
              >
                {t("contactUs:form.submit")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ContactUsData;
