import React from "react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Shop() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  function handlecheckout(id) {
    navigate(`/checkout/${id}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-api-cl99.onrender.com/api/products");
        setItems(res.data); // axios automatically parses JSON
      } catch (err) {
        toast.error("Error fetching:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const goToProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-100  ">
      <h1 className="text-3xl font-bold my-6">ALL Products</h1>
      <div className="flex gap-10 flex-wrap justify-evenly b p-6 bg-gray-100 ">
        {items.map((item) => (
          <motion.div
            key={item._id}
            className="flex flex-col items-center cursor-pointer p-4  rounded-lg hover:shadow-lg  hover:translate-y-2 "
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }} // animate only when visible
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <img
              onClick={() => goToProduct(item._id)}
              className="h-70 w-70 object-cover "
              src={`https://backend-api-cl99.onrender.com/uploads/${item.img}`}
              alt={item.name}
            />
            <p className="text-xl mt-2">{item.name}</p>
            <p className="text-2xl ">Price: ₹ {item.price}</p>
            <button
              onClick={ ()=>handlecheckout(item._id)}
              className="px-4 py-2 mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
