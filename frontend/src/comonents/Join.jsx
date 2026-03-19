import React from "react";
import Down from "../assets/down.jpg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

function Join() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const hello = async (data) => {
    try {
      const res = await axios.post(
        "https://backend-api-cl99.onrender.com/api/join",
        data,
      );
      setMessage(res.data.message);
      reset();
      navigate("/");
      toast.success("succesfully added to primum memeber");

      reset();
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center px-6 py-10 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${Down})` }}
    >
      <div className="flex-1 flex justify-center">
        <motion.form
          onSubmit={handleSubmit(hello)}
          className="p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div>
            <label className="text-xl font-semibold">
              Enter Your User Name
            </label>
            <input
              className="w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
              {...register("userName", {
                required: "User name is required",
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Only letters allowed",
                },
              })}
              placeholder="Enter your name"
              type="text"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xl font-semibold">Email Address</label>
            <input
              className="w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              type="email"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xl font-semibold">Password</label>
            <input
              className="w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
              {...register("Password", { required: "Password is required" })}
              placeholder="Enter your password"
              type="password"
              disabled={isSubmitting}
            />
            {errors.Password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold shadow-md transition"
            >
              Back
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold shadow-md transition"
            >
              {isSubmitting ? "Joining..." : "Join"}
            </button>
          </div>
        </motion.form>
      </div>

      {message && <p className="text-red-500 mt-4">{message}</p>}

      <motion.div
        className="flex-1 text-center md:text-left space-y-6 p-6"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }} // animate only when visible
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Join Our <br /> Premium Club
        </h1>

        <p className="text-lg md:text-2xl max-w-lg">
          Our premium membership gives you exclusive access to early-bird sales,
          new arrivals, and special offers.
        </p>
      </motion.div>
    </div>
  );
}

export default Join;
