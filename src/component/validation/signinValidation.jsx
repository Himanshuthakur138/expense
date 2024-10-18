import * as Yup from "yup";

export const signinValidation = Yup.object().shape({
  email:Yup.string().required("Email is required"),
  password:Yup.string().required("Password is required"),
});