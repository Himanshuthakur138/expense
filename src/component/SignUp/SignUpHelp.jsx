import React from "react";
import InputField from "../shared/form/InputField";
import { Button } from "@mui/joy";

const SignUpHelp = ({ control,errors }) => {
  return (
    <>
      <InputField
        className="w-80 mt-4 ml-2"
        label="Username"
        control={control}
        errors={errors}
        name="username"
        type="text"
      />
      <InputField
        className="w-80 mt-4 ml-2"
        label="Email"
        placeholder="example@gmail.com"
        control={control}
        errors={errors}
        name="email"
        type="email"
      />
      <InputField
        className="w-80 mt-4 ml-2"
        label="Password"
        control={control}
        errors={errors}
        name="password"
        type="password"
      />
      <Button type="text" className="mt-4 ml-2 bg-red-600 hover:bg-red-700 text-white font-bold 
                cursor-pointer px-6 py-2 rounded-md transition duration-300 btn">
        Submit
      </Button>
    </>
  );
};

export default SignUpHelp;
