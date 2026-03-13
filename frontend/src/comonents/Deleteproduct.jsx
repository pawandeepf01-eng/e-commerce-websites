import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
function Deleteproduct() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-23u8.onrender.com/api/products");
        setItems(res.data); // axios automatically parses JSON
      } catch (err) {
        toast.error("Error fetching:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://backend-23u8.onrender.com/api/deleteproduct/${id}`,
      );
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to delete");
    }
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
              className="h-70 w-70 object-cover "
              src={`https://backend-23u8.onrender.com/uploads/${item.img}`}
              alt={item.name}
            />
            <p className="text-xl mt-2">{item.name}</p>
            <p className="text-2xl ">Price: ₹ {item.price}</p>
            <button
              onClick={() => {
                deleteCartItem(item._id);
              }}
              className="px-4 py-2 mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              <Trash />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Deleteproduct;
