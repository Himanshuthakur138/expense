import * as Yup from "yup";

export const balanceValidation = Yup.object().shape({
    balance: Yup.string().required("Please Set Balance"),
});