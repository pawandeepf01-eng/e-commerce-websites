import React, { useState, useEffect } from "react";
import Video from "../assets/video.mp4";
import First from "../assets/first.jpg";
import Second from "../assets/second.jpg";
import Third from "../assets/third.jpg";
import Fourth from "../assets/fourth.jpg";
import Side from "../assets/side.jpg";
import Down from "../assets/down.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Home() {
    const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-api-61hk.onrender.com/api/products");
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching:", err.message);
      }
    };
    fetchProducts();
  }, []);



   const addcart = async (data) => {
    try {
      const res = await axios.post("http://localhost:6050/api/addcart", {
      name: data.name,
      price: data.price,
      img: data.img,
    });
      toast.success("succesfully added to cart");


    } catch (err) {
      toast.error("Something went wrong");
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };



  return (
    <>
      {/* HERO SECTION */}
      <div className="relative flex justify-center items-center w-full min-h-[70vh] md:min-h-[90vh] text-center px-6">
        <video
          src={Video}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <motion.div
          className="max-w-3xl flex flex-col gap-6 text-white"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          <p className="text-3xl md:text-4xl font-bold">
            Shop Our Premium Auto Parts
          </p>
          <p className="text-4xl md:text-6xl font-bold leading-tight">
            Build Your Dream Car Today.
          </p>
          <p className="text-3xl md:text-5xl font-bold">
            Now 15% Off On All Items.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition mx-auto"
          >
            Shop Now
          </button>
        </motion.div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="py-16 bg-gray-100 flex flex-col items-center px-6">
        <motion.div
          className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="text-3xl md:text-4xl font-bold">Shop By Category</p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-4 md:mt-0 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Shop Now
          </button>
        </motion.div>

        {/* Category Images */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {[First, Second, Third, Fourth].map((img, i) => (
            <div key={i} className="flex flex-col items-center cursor-pointer">
              <img
                className="h-40 w-40 sm:h-48 sm:w-48 object-cover rounded-lg hover:scale-110 transition duration-300"
                src={img}
                alt=""
              />
              <p className="text-xl mt-3 font-medium">
                {
                  [
                    "Wheels & Rims",
                    "Engine",
                    "Vehicle Body Parts",
                    "Accessories",
                  ][i]
                }
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ABOUT PREVIEW SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 bg-gray-900 text-white px-6 py-20">
        <motion.div
          className="max-w-xl flex flex-col gap-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="text-3xl md:text-4xl font-bold">
            The One-Stop Shop for Automotive Enthusiasts
          </p>
          <p className="text-lg md:text-xl">
            Tell visitors how your business got started and what makes it
            special. Share core values and what your site offers.
          </p>

          <button
            onClick={() => navigate("/about")}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition w-fit"
          >
            About Us
          </button>
        </motion.div>

        <motion.img
          src={Side}
          className="w-72 md:w-96 rounded-2xl hover:-translate-y-2 transition"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
          alt=""
        />
      </div>

      {/* TOP SELLERS */}
      <div className="py-20 bg-gray-100 px-4">
        <motion.p
          className="text-center text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          Top Sellers
        </motion.p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
          {items.map((item) => (
            <motion.div
              key={item._id}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }} // animate only when visible
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <img
                onClick={() => navigate(`/products/${item._id}`)}
                className="h-60 w-48 object-cover rounded-lg hover:-translate-y-2 transition cursor-pointer"
                src={`http://localhost:6050/uploads/${item.img}`}
                alt={item.name}
              />

              <p className="text-xl mt-3 font-medium">{item.name}</p>
              <p className="text-lg">₹ {item.price}</p>

              <button
                onClick={() => {addcart(item)}}
                className="mt-3 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow transition"
              >
                Add to cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* JOIN SECTION */}
      <div
        className="relative min-h-[60vh] w-full flex items-center text-white px-6 md:px-20 bg-cover bg-center"
        style={{ backgroundImage: `URL(${Down})` }}
      >
        <motion.div
          className="max-w-lg bg-black/40 p-6 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }} // animate only when visible
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="text-4xl md:text-6xl font-bold">
            Join Our Premium Club
          </p>

          <p className="text-lg md:text-2xl mt-4">
            Get exclusive early access to sales, new arrivals, and special
            offers.
          </p>

          <button
            onClick={() => navigate("/join")}
            className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow transition"
          >
            Join Us
          </button>
        </motion.div>
      </div>
    </>
  );
}

export default Home;
