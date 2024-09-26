import { useField } from "formik";
import React from "react";
import classNames from "classnames";
import InputMask from "react-input-mask";
import { useRouter } from "next/router";
const TextInputCreditCart = ({
  label,
  addClass,
  typeData = "text",
  children,
  ...props
}) => {
  const [field, meta] = useField(props);
  const router = useRouter();
  return (
    <div
      className={classNames("input", {
        "input--error": meta.touched && meta.error,
      })}
    >
      <label>
        <p className={`input__name input__name--small`}>{label}</p>
        <div className="input-wrapper">
          {typeData === "text" && (
            <input
              className={`input-item input-item--small  ${addClass}`}
              {...field}
              {...props}
            />
          )}
          {typeData === "cart" && (
            <InputMask
              mask="9999 9999 9999 9999"
              className={`input-item input-item--small  ${addClass}`}
              {...field}
              {...props}
            />
          )}
          {typeData === "sec_code" && (
            <InputMask
              mask="999"
              className={`input-item input-item--small  ${addClass}`}
              {...field}
              {...props}
            />
          )}
          {typeData === "date" && (
            <InputMask
              // mask="99/9999"
              className={`input-item input-item--small  ${addClass}`}
              {...field}
              {...props}
            />
          )}
          {typeData === "socialsecuritynumber" && (
            <InputMask
              mask="999-99-9999"
              className={`input-item input-item--small  ${addClass}`}
              {...field}
              {...props}
            />
          )}
          {children}
          {/*{meta.touched && meta.error && <div>{meta.error}</div>}*/}
        </div>
      </label>
    </div>
  );
};
export default TextInputCreditCart;
