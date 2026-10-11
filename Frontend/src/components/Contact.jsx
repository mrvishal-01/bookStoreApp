import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen mt-20 items-center justify-center bg-white dark:bg-slate-900">

      <div className="w-[600px] rounded-xl bg-white p-8 shadow-md dark:bg-slate-800 dark:text-white">

        <h2 className="mb-6 text-2xl font-bold">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 block text-lg">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-md border px-4 py-2 outline-none bg-white text-slate-800 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <span className="text-sm text-red-500">
                Name is required
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-lg">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border px-4 py-2 outline-none bg-white text-slate-800 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <span className="text-sm text-red-500">
                Email is required
              </span>
            )}
          </div>

          {/* Mobile */}
          <div className="mb-5">
            <label className="mb-2 block text-lg">
              Mobile
            </label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full rounded-md border px-4 py-2 outline-none bg-white text-slate-800 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              {...register("mobile", { required: true })}
            />

            {errors.mobile && (
              <span className="text-sm text-red-500">
                Mobile is required
              </span>
            )}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="mb-2 block text-lg">
              Message (Optional)
            </label>

            <textarea
              placeholder="Enter your message"
              rows="4"
              className="w-full rounded-md border px-4 py-2 outline-none bg-white text-slate-800 dark:bg-slate-700 dark:text-white dark:border-slate-600"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex flex-row items-center justify-between gap-4">
          <button
            type="submit"
            className="rounded-md bg-pink-500 px-6 py-2 text-white hover:bg-pink-700 duration-200"
          >
            Submit
          </button>
            <Link to="/">
          <button className="flex items-center justify-start gap-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
          Back
        </button>
        </Link>
        </div>
        </form>
      </div>

    </div>
  );
}

export default Contact;