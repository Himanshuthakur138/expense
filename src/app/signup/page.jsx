"use client";
import SignUpHelp from "@/component/SignUp/SignUpHelp";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import { Sheet } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button, Typography } from "@mui/material";
import { signupValidation } from "@/component/validation/signupValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
const SignUpform = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({resolver: yupResolver(signupValidation)});
  const [data, setData] = useLocalStorage("register", []);

  const onSubmit = (registeruser) => {
    console.log("register", registeruser);
    const checkData = data.find(
      (item) =>
        item.email === registeruser.email ||
        item.password === registeruser.password ||
        item.username === registeruser.username
    );

    if (checkData) {
      if (checkData.email === registeruser.email) {
        errorMsg("Email is alread exist");
      } else if (checkData.password === registeruser.password) {
        errorMsg("Password is already exist");
      } else if (checkData.username === registeruser.username) {
        errorMsg("Username is already exist");
      } else {
        errorMsg("User is already exist");
      }
    } else {
      try {
        const storedData = [...data, registeruser];
        setData(storedData);
        successMsg("User is added successfully")
      } catch (error) {
        errorMsg("An error occurred while saving data:", error)
      }
    }
    reset();
  };

  return (
    <>
      <Sheet
        sx={{
          width: 400,
          mx: "auto",
          my: 5,
          py: 5,
          px: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="icon">
              <PersonAddIcon fontSize="large" className="usericon" />
            </div>
            <div>
              <Typography variant="h4" className="text-center">
                <b>Register User</b>
              </Typography>
            </div>
            <br />
          <SignUpHelp control={control} errors={errors}/>
          <p>
                Already have an account
                <Button
                  className=" btn ml-2 bg-red-600 hover:bg-red-700 text-white font-bold 
                cursor-pointer px-6 py-2 rounded-md transition duration-300"
                >
                  <Link href="/auth/signin">SignIn</Link>{" "}
                </Button>
              </p>
        </form>
      </Sheet>
    </>
  );
};

export default SignUpform;
