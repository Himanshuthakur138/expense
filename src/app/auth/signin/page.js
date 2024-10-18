"use client";
import { FormControl } from "@mui/joy";
import { Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import InputField from "@/component/shared/form/InputField";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinValidation } from "@/component/validation/signinValidation";
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(signinValidation) });
  const router = useRouter();
  const onSubmit = async (data) => {
    const { email, password } = data;
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
        router.replace("/");
        return successMsg("Login Successfully");
      }
    } catch (error) {
      return errorMsg("Login Error");
    }
  };
  return (
    <>
      <div>
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
              <AccountCircleIcon fontSize="large" className="usericon" />
            </div>
            <div>
              <Typography variant="h4" className="text-center">
                <b>Welcome!</b>
              </Typography>
            </div>
            <br />
            <div>
              <FormControl>
                <InputField
                  className="w-80 ml-2"
                  label="Email"
                  control={control}
                  errors={errors}
                  name="email"
                  type="email"
                  placeholder="example123@gmail.com"
                />
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <InputField
                  className="w-80 ml-2"
                  control={control}
                  errors={errors}
                  name="password"
                  type="password"
                  label="Password"
                />
              </FormControl>
            </div>
            <br />
            <div>
              <Button
                type="submit"
                className=" btn ml-2 bg-red-600 hover:bg-red-700 text-white font-bold 
                cursor-pointer px-6 py-2 rounded-md transition duration-300"
              >
                Login
              </Button>
              <br />
              <p>
                Dont have Account
                <Button
                  className=" btn ml-2 bg-red-600 hover:bg-red-700 text-white font-bold 
                cursor-pointer px-6 py-2 rounded-md transition duration-300"
                >
                  <Link href="/signup">SignUp</Link>{" "}
                </Button>
              </p>
            </div>
          </form>
        </Sheet>
      </div>
    </>
  );
};

export default Login;
