import { useField } from "formik";
import React, { useState } from "react";
import LockPasIcon from "../icon/LockPasIcon";
import ShowPasIcon from "../icon/ShowPasIcon";
import classNames from "classnames";

const PasswordInput = ({ label, notify, errorMessage, ...props }) => {
  const [active, setActive] = useState(true);
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
          <input
            className="input-item"
            type={active ? "password" : "text"}
            {...field}
            {...props}
          />
          <button
            type="button"
            className="show-pass"
            onClick={() => setActive(!active)}
          >
            {active ? <LockPasIcon /> : <ShowPasIcon />}
          </button>
        </div>
        {meta.error && meta.touched ? errorMessage : notify}
      </label>
    </div>
  );
};

export default PasswordInput;
