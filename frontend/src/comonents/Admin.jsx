import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";

function Admin() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function handlerouteback() {
    navigate("/");
  }
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("discription", data.discription);
      formData.append("img", data.img[0]); // file input gives array

      // Send with axios
      const res = await axios.post("https://backend-api-cl99.onrender.com/api/add", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setMessage(res.data.message);
      toast.success("data are sucessfully addedd");

      reset();
      navigate("/")
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className="main min-h-screen w-full  flex justify-center items-center  "
        
      >
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col p-15 gap-4 w-150 bg-white/98 rounded-lg shadow-lg "
        >
          <label className="font-semibold text-gray-700">
            {errors.name ? (
              <p className="text-red-600">{errors.name.message}</p>
            ) : (
              "Product Name"
            )}
          </label>
          <input
            className="p-2 border-2 border-gray-300 rounded outline-none 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("name", {
              required: "name is required",
              pattern: {
                // value: /^[A-Za-z ]+$/,
                message: "Only letters are allowed",
              },
            })}
            placeholder="Enter your product name"
            type="text"
          />

          <label className="font-semibold text-gray-700">
            {errors.price ? (
              <p className="text-red-600">{errors.price.message}</p>
            ) : (
              "Price"
            )}
          </label>
          <input
            className="p-2 border-2 border-gray-300 rounded outline-none 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("price", {
              required: "price is required",
              pattern: {
                // value: /^[A-Za-z ]+$/,
                message: "Only letters are allowed",
              },
            })}
            placeholder="Enter your price"
            type="number"
          />

          <label className="font-semibold text-gray-700">
            {errors.discription ? (
              <p className="text-red-600">{errors.discription.message}</p>
            ) : (
              "discription"
            )}
          </label>
          <input
            className="p-2 border-2 border-gray-300 rounded outline-none 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("discription", {
              required: "price is required",
              pattern: {
                // value: /^[A-Za-z ]+$/,
                message: "Only letters are allowed",
              },
            })}
            placeholder="Enter your discription"
            type="text"
          />

          <label className="font-semibold text-gray-700">
            {errors.img ? (
              <p className="text-red-600">{errors.img.message}</p>
            ) : (
              "img"
            )}
          </label>
          <input
            className="p-2 border-2 border-gray-300 rounded outline-none 
                transition cursor-pointer"
            {...register("img", {
              required: "img is required",
              pattern: {
                // value: /^[A-Za-z ]+$/,
                // message: "Only letters are allowed",
              },
            })}
            placeholder="uploads"
            type="file"
          />
          <div className="flex justify-evenly">
            <button
              onClick={handlerouteback}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default Admin;
