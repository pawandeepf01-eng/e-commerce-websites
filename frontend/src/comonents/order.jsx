import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Order() {
  const [item, setitem] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("https://backend-23u8.onrender.com/api/order");
        setitem(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>

      <div className="container mx-auto max-w-5xl">
        {item.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No order found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {item.map((index) => (
              <div
                key={index._id}
                className="bg-white shadow-lg rounded-xl p-5 flex flex-col gap-3 hover:shadow-2xl transition"
              >
                {/* Product Image */}
                <img
                  src={`https://backend-23u8.onrender.com/uploads/${index.img}`}
                  alt="order"
                  className="h-80 w-full object-cover rounded-md"
                />

                {/* Product Info */}
                <div className="text-gray-800">
                  <p className="text-lg font-semibold">{index.productname}</p>

                  <p className="text-blue-700 font-bold text-lg">
                    ₹{index.price}
                  </p>

                  <p><span className="font-semibold">Email:</span> {index.email}</p>
                  <p><span className="font-semibold">Name:</span> {index.customerName}</p>
                  <p><span className="font-semibold">Address:</span> {index.address}</p>
                  <p><span className="font-semibold">Phone:</span> {index.phone}</p>

                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Order Date:</span>
                    {new Date(index.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;