import { useField } from "formik";
import React from "react";
import classNames from "classnames";
const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={classNames("input", {
        "input--error": meta.touched && meta.error,
      })}
    >
      <label>
        <p className="input__name">{label}</p>
        <div className="input-wrapper">
          <input className="input-item" {...field} {...props}>
          </input>
          {meta.touched && meta.error && <div className="red-Validation">{meta.error}</div>}
        </div>
      </label>
    </div>
  );
};

export default TextInput;
