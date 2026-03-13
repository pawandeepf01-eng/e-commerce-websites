import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState([]);

  function handlecheckout(id) {
    navigate(`/checkout/${id}`);
  }

  const addcart = async (data) => {
    try {
      const res = await axios.post("https://backend-api-cl99.onrender.com/api/addcart", {
        name: data.name,
        price: data.price,
        img: data.img,
      });
      toast.success("succesfully added to cart");
      // navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://backend-api-cl99.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row items-center bg-gray-100 p-4 lg:p-6 justify-center gap-6">
    <motion.div
      className="p-4 rounded-lg"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2 }}
    >
      <img
        src={`https://backend-api-cl99.onrender.com/uploads/${product.img}`}
        alt={product.name}
        className="h-80 w-80 sm:h-96 sm:w-96 lg:h-[600px] lg:w-[600px] object-cover rounded-lg shadow-md"
      />
    </motion.div>

    <motion.div
      className="p-4 lg:p-6 rounded-lg max-w-md text-center lg:text-left"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2 }}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-4">
        {product.name}
      </h1>

      <p className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-green-400 mt-2">
        ₹ {product.price}
      </p>

      <p className="mt-4 text-sm sm:text-base">
        {product.discription}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
        <button
          className="px-6 py-3 lg:px-8 lg:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          onClick={() => {
            addcart(product);
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={() => handlecheckout(product._id)}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Buy Now
        </button>
      </div>
    </motion.div>
  </div>
  );
}

export default ProductDetails;
