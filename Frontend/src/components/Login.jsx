import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    console.log("Login button clicked");
    console.log("Sending login request:", userInfo.email);

    try {
      const res = await axios.post(
        "http://localhost:4001/User/login",
        userInfo
      );

      console.log("Login response:", res.data);

      if (res.data && res.data.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        toast.success("Logged in Successfully!");

        const modal = document.getElementById("my_modal_3");

        if (modal) {
          modal.close();
        }

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        toast.error(
          "Error: " + (err.response.data.message || "Login failed")
        );
      } else {
        toast.error("Server se connection nahi ho pa raha!");
      }
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_3");

    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white text-slate-800 dark:bg-slate-800 dark:text-white">
          {/* Close Button */}
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          {/* Heading */}
          <h3 className="font-bold text-lg">Login</h3>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              <br />

              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <br />

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className="bg-pink-500 text-white px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Login
              </button>

              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  onClick={closeModal}
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}