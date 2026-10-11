import React from "react";
import Login from "../components/Login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/User/signup",
        userInfo
      );

      console.log(res.data);

      toast.success("Signup successful!");

      // Redirect after successful signup
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-slate-900">
        {/* Signup Box */}
        <div className="relative w-full max-w-[600px] rounded-xl bg-white p-8 shadow-md dark:bg-slate-800">
          {/* Close Button */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-slate-700 dark:text-white"
          >
            ✕
          </Link>

          {/* Heading */}
          <h3 className="mb-6 text-2xl font-bold text-slate-700 dark:text-white">
            Signup
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-5">
              <label className="mb-2 block text-xl text-slate-700 dark:text-white">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg text-slate-800 outline-none focus:border-pink-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                {...register("fullname", {
                  required: "Name is required",
                })}
              />

              {errors.fullname && (
                <span className="text-sm text-red-500">
                  {errors.fullname.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-xl text-slate-700 dark:text-white">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg text-slate-800 outline-none focus:border-pink-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="mb-2 block text-xl text-slate-700 dark:text-white">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg text-slate-800 outline-none focus:border-pink-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-pink-500 px-6 py-3 text-lg text-white duration-200 hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>

              <div className="text-lg">
                <span className="text-slate-700 dark:text-white">
                  Have an account?{" "}
                </span>

                <button
                  type="button"
                  className="cursor-pointer text-blue-500 underline"
                  onClick={() => {
                    document.getElementById("my_modal_3")?.showModal();
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Login Modal */}
        <Login />
      </div>
    </>
  );
}

export default Signup;