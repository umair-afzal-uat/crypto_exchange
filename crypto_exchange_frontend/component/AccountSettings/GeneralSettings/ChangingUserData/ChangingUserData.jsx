import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import React from "react";
import InputSetting from "../../../Base/InputSetting/InputSetting";
import { changeDataUser, changeEmailUser } from "../../actions";
import { getDataSettingUser } from "../../slice";
import moment from "moment";

const ChangingUserData = () => {
  const { user } = useSelector(getDataSettingUser);
  const dispatch = useDispatch();
  return (
    <div className="content-block content-block--wider">
      <div className="content-block__inside">
        <div className="content-block__header">
          <h3 className="content-block__title content-block__title--medium">
            Changing user data
          </h3>
        </div>
        <div className="content-block__main">
          <div className="table-wrapper user-data">
            <Formik
              enableReinitialize={true}
              initialValues={{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                date_birth: user.date_birth,
                debit_card_number: user.debit_card_number,
                btc_address: user.btc_address,
                debit_card_expiry_date: user.debit_card_expiry_date,
                debit_card_sec_number: user.debit_card_sec_number,
                social_security_number: user.social_security_number,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);

                if (user.first_name !== values.first_name) {
                  dispatch(
                    changeDataUser({
                      first_name: values.first_name,
                    })
                  );
                }
                if (user.last_name !== values.last_name) {
                  dispatch(
                    changeDataUser({
                      last_name: values.last_name,
                    })
                  );
                }
                if (values.date_birth !== "" && values.date_birth !==user.date_birth) {
                  dispatch(
                        changeDataUser({
                          date_birth: moment(values.date_birth).format(
                            "YYYY-MM-DD"
                          ),
                        })
                      );
                }
                if (user.address !== values.address && values.address !== "") {
                  dispatch(
                    changeDataUser({
                      address: values.address,
                    })
                  );
                }
                if (user.btc_address !== values.btc_address && values.btc_address !== "") {
                  dispatch(
                    changeDataUser({
                      btc_address: values.btc_address,
                    })
                  );
                }
                if (user.phone !== values.phone) {
                  const tel = values.phone
                    .replace("(", "")
                    .replace(")", "")
                    .replace("-", "")
                    .split(" ")
                    .join("");
                  dispatch(
                    changeDataUser({
                      phone: tel,
                    })
                  );
                }
                if (user.email !== values.email) {
                  dispatch(
                    changeEmailUser({ email: values.email.toLowerCase() })
                  );
                }
                if (user.debit_card_number !== values.debit_card_number) {
                  const debit_card_numb = values.debit_card_number
                    .replace("(", "")
                    .replace(")", "")
                    .replace("-", "")
                    .split(" ")
                    .join("");
                  dispatch(
                    changeDataUser({ debit_card_number: debit_card_numb })
                  );
                }
                if (user.debit_card_expiry_date !== values.debit_card_expiry_date) {
                  dispatch(
                    changeDataUser({ debit_card_expiry_date: values.debit_card_expiry_date })
                  );
                }
                if (user.debit_card_sec_number !== values.debit_card_sec_number) {
                  const debit_card_sec_number = values.debit_card_sec_number
                    .replace("(", "")
                    .replace(")", "")
                    .replace("-", "")
                    .split(" ")
                    .join("");
                  dispatch(
                    changeDataUser({ debit_card_sec_number: debit_card_sec_number })
                  );
                }
                if (user.social_security_number !== values.social_security_number) {
                  dispatch(
                    changeDataUser({ social_security_number: values.social_security_number })
                  );
                }
              }}
            >
              <Form className="form form--regular user-data__form">
                <div className="table user-data__table">
                  <div className="table-body user-data__body">
                    <InputSetting
                      label="First Name"
                      name="first_name"
                      type="text"
                    />
                    <InputSetting
                      label="Last name"
                      name="last_name"
                      type="text"
                    />
                    <InputSetting
                      label="Address"
                      name="address"
                      type="text"
                    />
                    <InputSetting
                      typeData="tel"
                      label="Phone Number"
                      name="phone"
                      type="tel"
                    />
                    <InputSetting
                      typeData="dob"
                      type="number"
                      label="Date of Birth"
                      name="date_birth"
                    />
                    <InputSetting
                      typeData="debit_card_number"
                      type="text"
                      label="Debit Card Number"
                      name="debit_card_number"
                    />
                    <InputSetting
                      label="BTC Address"
                      name="btc_address"
                      type="text"
                    />
                    <InputSetting
                      typeData="date"
                      type="text"
                      label="Exp. Date"
                      name="debit_card_expiry_date"
                    />
                    <InputSetting
                      typeData="debit_card_sec_number"
                      type="text"
                      label="Sec. Code"
                      name="debit_card_sec_number"
                    />
                    <InputSetting
                    typeData="social_security_number"
                      type="text"
                      label="Social Security Number"
                      name="social_security_number"
                    />
                    <InputSetting label="Email" name="email" type="email" />
                  </div>
                </div>
                <div className="form__footer">
                  <button
                    className="button button--wide button--right"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangingUserData;
