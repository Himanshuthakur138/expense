"use client";
import SignUpHelp from "@/component/SignUp/SignUpHelp";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import { Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { signupValidation } from "@/component/validation/signupValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignUpform = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupValidation) });
  const [data, setData] = useLocalStorage("register", []);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const onSubmit = async (registeruser) => {
    const checkData = data.find(
      (item) =>
        item.email === registeruser.email ||
        item.username === registeruser.username
    );

    if (checkData) {
      if (checkData.email === registeruser.email) {
        errorMsg("Email is alread exist");
      } else if (checkData.username === registeruser.username) {
        errorMsg("Username is already exist");
      } else {
        errorMsg("User is already exist");
      }
    } else {
      try {
        const storedData = [...data, registeruser];
        setData(storedData);
        setUser(registeruser);
        successMsg("User registered successfully");
      } catch (error) {
        errorMsg("An error occurred while saving data:", error);
      }
    }
    reset();
  };
  useEffect(() => {
    if (!user) return;
    const loginuser = async () => {
      const { email, password } = user;
      const localData = localStorage?.getItem("register");

      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          localData,
        });
        if (res.error) {
          return errorMsg("Invalid credentials");
        } else {
          router.replace("/expense");
          return successMsg("Login Successfully");
        }
      } catch (error) {
        return errorMsg("Login Error");
      }
    };
    loginuser();
  }, [user]);
  return (
    <>
      <div className="mt-5 grid place-items-center h-screen">
        <div
          className="shadow-xl border border-slate-200 flex rounded-3xl bg-white overflow-hidden login-container"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <div className="w-1/2">
            <img
              src="/signup.jpg"
              alt="Sign Up"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-1/2">
            <Sheet
              sx={{
                mx: "auto",
                my: 5,
                py: 5,
                px: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <div>
                  <Typography variant="h4" className="text-center">
                    <b>Register User</b>
                  </Typography>
                </div>
                <br />
                <SignUpHelp control={control} errors={errors} />
                <p className="mt-2 ml-2">
                  Already have an account
                  <span className="ml-2">
                    {" "}
                    <Link href="/auth/signin" className="text-blue-600">
                      Sign In
                    </Link>
                  </span>
                </p>
              </form>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpform;
