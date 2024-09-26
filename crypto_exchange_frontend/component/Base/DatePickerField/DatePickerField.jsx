import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import MaskedTextInput from "react-text-mask";
import classNames from "classnames";
export const DatePickerField = ({ label, placeholder, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <>
      <div
        className={classNames("input", {
          "input--error": meta.error,
        })}
      >
        <label>
          <p className="input__name">{label}</p>
          <div className="input-wrapper">
            {
            <DatePicker
              className={"input-item"}
              autoComplete="off"
              shouldCloseOnSelect={true}
              peekNextMonth={true}
              showMonthDropdown={true}
              showYearDropdown={true}
              dropdownMode="select"
              dateFormat="MM/dd/yyyy"
              {...field}
              {...props}
              selected={(field.value && new Date(field.value)) || null}
              onChange={(val) => {
                setFieldValue(field.name, val);
              }}
              placeholderText={placeholder}
              customInput={
                (field.name == "debit_card_expiry_date")?
                <MaskedTextInput
                  placeholder="__/____"
                  type="text"
                  guide={false}
                  mask={[
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                />:<MaskedTextInput
                placeholder="__/__/____"
                type="text"
                guide={false}
                mask={[
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
              }
            />
}
          </div>
        </label>
      </div>
    </>
  );
};
export default DatePickerField;
