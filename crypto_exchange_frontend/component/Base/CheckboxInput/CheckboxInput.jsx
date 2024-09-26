import { useField } from "formik";
import React, { useState } from "react";

const CheckboxInput = ({ label, ...props }) => {
  const [state, setState] = useState(true);
  const [field, meta] = useField(props);
  return (
    <input
      className="hidden"
      type="checkbox"
      onChange={() => setState((pre) => !pre)}
      {...field}
      {...props}
    />
  );
};
export default CheckboxInput;
