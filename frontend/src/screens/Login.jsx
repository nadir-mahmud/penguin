import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async () => {
    try {
      const res = await axios.post(
        "https://penguin-alpha.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // setAuth({
        //   ...auth,
        //   user: res.data.user,
        //   token: res.data.token,
        // });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        console.log("Hello");
        toast.error("Email or Password is not correct!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="w-screen px-3">
        <Toaster
          containerStyle={{
            top: 80,
          }}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center  "
          style={{ minHeight: "78vh" }}
        >
          <div
            className={
              errors.email ? "w-full  md:w-1/3" : "w-full mb-4   md:w-1/3"
            }
          >
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="block text-red-500 text-sm mt-2 ml-3">
                *Email is required
              </p>
            )}
          </div>

          <div
            className={
              errors.password ? "w-full  md:w-1/3" : "w-full mb-4   md:w-1/3"
            }
          >
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="block text-red-500 text-sm my-2 ml-3">
                *Password is required
              </p>
            )}
          </div>

          <input
            type="submit"
            className="w-full md:w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          />
        </form>
      </div>
    </Layout>
  );
};

export default Login;
