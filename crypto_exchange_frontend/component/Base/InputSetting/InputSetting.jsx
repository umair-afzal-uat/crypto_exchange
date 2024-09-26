import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import classNames from "classnames";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import MaskedTextInput from "react-text-mask";
import EditIcon from "../icon/EditIcon";
const InputSetting = ({ label, typeData = "text", placeholder, ...props }) => {
  const [edit, setEdit] = useState(false);
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  return (
    <div
      className={classNames("tr user-data__tr", {
        "user-data__tr--active": edit,
      })}
    >
      <div className="td user-data__td user-data__td--name">{label}:</div>
      <div className="td user-data__td">
        <div className={(label==="Debit Card Number" && !edit )? "input-wrapper star-input" : (label==="Sec. Code" && !edit )?"input-wrapper star-input1":(label==="Social Security Number" && !edit ) ? "input-wrapper star-input2" : "input-wrapper" } >
          {typeData === "text" && (
            <input
              className="input-item input-item--regular input-item--settings"
              {...field}
              {...props}  
              readOnly={!edit}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            />
          )}
          {typeData === "debit_card_number" && (
            <InputMask
            mask="9999-9999-9999-9999"
              className="input-item input-item--regular input-item--settings"
              {...field}
              {...props}
              readOnly={!edit}
            />
          )}
          {typeData === "debit_card_sec_number" && (
            <InputMask
              mask="999"
              className="input-item input-item--regular input-item--settings"
              {...field}
              {...props}
              readOnly={!edit}
            />
          )}
          {typeData === "social_security_number" && (
            <InputMask
              mask="999-99-9999"
              className="input-item input-item--regular input-item--settings"
              {...field}
              {...props}
              readOnly={!edit}
            />
          )}
          {typeData === "tel" && (
            <InputMask
              mask="+9 (999) 999-9999"
              className="input-item input-item--regular input-item--settings"
              {...field}
              {...props}
              readOnly={!edit}
            />
          )}
          
          {typeData === "dob" && (
            <DatePicker
              className="input-data-setting input-item--settings"
              autoComplete="off"
              shouldCloseOnSelect={true}
              peekNextMonth={true}
              showMonthDropdown={true}
              showYearDropdown={true}
              dropdownMode="select"
              dateFormat="MM-dd-yyyy"
              readOnly={!edit}
              {...field}
              {...props}
              selected={(field.value && new Date(field.value)) || null}
              onChange={(val) => {
                setFieldValue(field.name, val);
              }}
              placeholderText={placeholder}
              customInput={
                <MaskedTextInput
                  readOnly={!edit}
                  placeholder="____/__"
                  type="text"
                  guide={false}
                  mask={[
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}      
                />
              }
            />
          )}
          {typeData === "date" && (
            <InputMask
              mask="99/9999"
              className="input-item input-item--regular input-item--settings"
              {...field}
              {...props}
              readOnly={!edit}
            />
          )} 
        </div>
      </div>
      <div className="td td--right user-data__td">
        <button
          type="button"
          onClick={() => setEdit(!edit)}
          className="edit-btn"
        >
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

export default InputSetting;
