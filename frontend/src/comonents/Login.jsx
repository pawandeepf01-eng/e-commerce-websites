import React from "react";
import Back from "../assets/logiin2.avif";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://backend-api-cl99.onrender.com/api/login",
        data,
        {
          withCredentials: true,
        },
      );
      setMessage(res.data.message);
      const role = res.data.role;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/");
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div
        className="main min-h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat gap-6 md:gap-20 px-6"
        style={{ backgroundImage: `url(${Back})` }}
      >
        <motion.form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col p-10 gap-4 w-110 bg-white/40 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <label className="font-semibold text-gray-700">
            {errors.Email ? (
              <p className="text-red-600">{errors.Email.message}</p>
            ) : (
              "Email"
            )}
          </label>
          <input
            className="p-2 border-2 border-gray-300 rounded outline-none 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your Email"
            type="email"
          />

          <label className="font-semibold text-gray-700">
            {errors.Password ? (
              <p className="text-red-600">{errors.Password.message}</p>
            ) : (
              "Password"
            )}
          </label>
          <input
            className="p-2 border-2 border-gray-300 rounded outline-none 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("Password", {
              required: "Password is required",
            })}
            placeholder="Enter your password"
            type="password"
            disabled={isSubmitting}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Loging" : "Login"}
          </button>
          {message && <p>{message}</p>}

          <p>
            don't have an account
            <Link
              className="underline decoration-1 text-blue-700"
              to="/register"
            >
              Register
            </Link>
          </p>
        </motion.form>
      </div>
    </>
  );
}

export default Login;
