import * as Yup from "yup";

export const FormValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email:Yup.string().required("Email is required"),
  password:Yup.string().required("Password is required"),
  number:Yup.string().required("Number is required"),
});