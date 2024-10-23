import * as Yup from "yup";

export const transactionValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.string().required("Amount is required"),

  date: Yup.date()
  .required("Date is required"),
  type: Yup.string().required("Type is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10"),
});
