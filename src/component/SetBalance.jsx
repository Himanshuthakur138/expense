import React, { useContext } from "react";
import FormInput from "./shared/form/formData";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { balanceValidation } from "./validation/balanceValidation";
import UserContext from "@/context/UserContext";
import { successMsg } from "./Toastmsg/toaster";

const SetBalance = ({setOpen}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(balanceValidation) });
  const {setTotalBalance}=useContext(UserContext)
  const onSubmit = (data) => {
    const storedData = parseFloat(data.balance);
    setTotalBalance(storedData);
    reset();
    setOpen(false)
    successMsg("Balance added successfully")
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="balance"
        className="mt-4"
        label="Set Balance"
        placeholder="Set Balance"
        inputType="number"
        id="balance"
         min="0"
        errors={errors}
      />
      <Button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        type="submit"
      >
        Submit Balance
      </Button>
    </form>
  );
};

export default SetBalance;
