import * as Yup from "yup";

export const signupValidation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
