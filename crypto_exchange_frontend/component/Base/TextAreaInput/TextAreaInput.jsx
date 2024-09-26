import React from "react";
import { useField } from "formik";
import classNames from "classnames";

const TextAreaInput = ({ label, ...props }) => {
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
          <textarea
            className="input-item input-item--textarea"
            {...field}
            {...props}
          />
          {meta.touched && meta.error && <div className="red-Validation">{meta.error}</div>}
        </div>
      </label>
    </div>
  );
};

export default TextAreaInput;
