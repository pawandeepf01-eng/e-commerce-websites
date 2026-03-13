import { useState } from "react";
import { useForm } from "react-hook-form";
import Img from "../assets/down.jpg";
import Back from "../assets/side.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Register() {
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
        "https://backend-api-cl99.onrender.com/api/register",
        data,
      );
      setMessage(res.data.message);
      const role = res.data.role;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      toast.success("Register succesfully");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div
        className="main min-h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat gap-6 md:gap-20 px-4"
        style={{ backgroundImage: `url(${Back})` }}
      >
        {/* <div className="formdiv mt-5 w-110 border border-red-600"> */}
        <motion.form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col p-10 gap-4 w-100 bg-white/80 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Username */}
          <label className="font-semibold text-gray-700">
            {errors.userName ? (
              <p className="text-red-600">{errors.userName.message}</p>
            ) : (
              "User Name"
            )}
          </label>
          <input
            className="p-2 border-2 border-gray-300 rounded outline-none 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("userName", {
              required: "User name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only letters are allowed",
              },
            })}
            placeholder="Enter your name"
            type="text"
          />

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
          {message && <p>{message}</p>}

          <p>
            Alerady have an account
            <Link className="underline decoration-1 text-blue-700" to="/login">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
      {/* </div> */}
    </>
  );
}

export default Register;
