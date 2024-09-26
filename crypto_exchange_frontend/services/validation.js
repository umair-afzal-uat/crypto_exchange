import * as Yup from "yup";
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,4}))$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
// const PHONE_REGEX = /^[+][1-9][\d]{9,13}$/;
const PASSWORD_REGEX2 =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
export const validationSchemaSingUp = Yup.object().shape({
  first_name: Yup.string()
    .typeError("Should be a string")
    .max(25, "Must be 20 characters or less")
    .min(3, "minimum 3")
    .required("Required"),
  last_name: Yup.string()
    .typeError("Should be a string")
    .max(25, "Must be 20 characters or less")
    .min(3, "minimum 3")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
  .required("Required")
    .matches(PHONE_REGEX, "Phone number is not valid"),
  address: Yup.string()
    .typeError("Should be a string")
    .min(2, "Must be 8 characters or less")
    .max(80, "Must be 120 characters or less"),
  // .required("Required")
  date_birth: Yup.date().max(new Date(), `min data ${new Date()}`),
});
export const validationSchemaPay = Yup.object().shape({
  name: Yup.string()
    .typeError("Should be a string")
    .max(25, "Must be 20 characters or less")
    .min(3, "minimum 3")
    .required("Required"),
  number: Yup.string()
    .required("Required")
    .matches(/[1-9,\s]{19}/, "Must be exactly 16 digits"),
  date: Yup.string()
    .required("Required")
    .matches(/[1-9,\/,\1-9]{7}/, "Must be exactly 7 digits"),

  cvc: Yup.string().required("required"),
});

export const validationSchemaConfirmPass = Yup.object().shape({
  password: Yup.string()
    .typeError("Should be a string")
    .min(8, "Must be 8 characters or less")
    .max(25, "Must be 25 characters or less")
    .required("Required")
    .matches(
      PASSWORD_REGEX2,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string().when("password", {
    is: (val) => val && val.length > 0,
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
  conditions: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

export const validationSchemaLogIn = Yup.object().shape({
  password: Yup.string()
    .typeError("Should be a string")
    .min(8, "Must be 8 characters or less")
    .max(25, "Must be 25 characters or less")
    .required("Required")
    .matches(
      PASSWORD_REGEX2,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .matches(EMAIL_REGEX, "MInvalid email address"),
  // conditions: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

export const validationSchemaResetPassword = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .matches(EMAIL_REGEX, "MInvalid email address"),
});
export const validationSchemaChangePassword = Yup.object().shape({
  password: Yup.string()
    .typeError("Should be a string")
    .min(8, "Must be 8 characters or less")
    .max(25, "Must be 25 characters or less")
    .required("Required")
    .matches(
      PASSWORD_REGEX2,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string().when("password", {
    is: (val) => val && val.length > 0,
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});
export const validationSchemaChangePasswordOnSettings = Yup.object().shape({
  oldPassword: Yup.string()
    .typeError("Should be a string")
    .min(8, "Must be 8 characters or less")
    .max(25, "Must be 25 characters or less")
    .required("Required")
    .matches(
      PASSWORD_REGEX2,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  password: Yup.string()
    .typeError("Should be a string")
    .min(8, "Must be 8 characters or less")
    .max(25, "Must be 25 characters or less")
    .required("Required")
    .matches(
      PASSWORD_REGEX2,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirmation: Yup.string().when("password", {
    is: (val) => val && val.length > 0,
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});
export const validationSchemaContactUs = Yup.object().shape({
  fullName: Yup.string()
    .typeError("Should be a string")
    .max(25, "Must be 25 characters or less")
    .min(3, "minimum 3")  
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  // phone: Yup.string()
  //   // .required("required")
  //   .matches(PHONE_REGEX, "Phone number is not valid"),
  message: Yup.string()
    .typeError("Should be a string")
    .min(3, "Must be 3 characters or more")
    .max(255, "Must be 255 characters or less")
    .required("Required"),
});
// export const validationSchemaLoan = Yup.object().shape({
//   fullName: Yup.string()
//     .typeError("Should be a string")
//     .max(25, "Must be 25 characters or less")
//     .min(3, "minimum 3")
//     .required("Required"),
//   email: Yup.string().email("Invalid email address").required("Required"),
//   // phone: Yup.string()
//   //   // .required("required")
//   //   .matches(PHONE_REGEX, "Phone number is not valid"),
//   message: Yup.string()
//     .typeError("Should be a string")
//     .min(3, "Must be 3 characters or more")
//     .max(255, "Must be 255 characters or less")
//     .required("Required"),
// });
