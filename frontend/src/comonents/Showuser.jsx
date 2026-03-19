import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

function Showuser() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://backend-api-cl99.onrender.com/api/showuser"
        );
        setItems(res.data);
      } catch (err) {
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://backend-api-cl99.onrender.com/api/deleteuser/${id}`
      );

      setItems((prev) => prev.filter((item) => item._id !== id));

      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-3 md:p-6">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-6">
        All Users
      </h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="grid grid-cols-3 md:grid-cols-5 bg-blue-600 text-white font-semibold py-3 px-4 text-sm md:text-base">
          <p>Name</p>
          <p>Email</p>
          <p className="hidden md:block">Role</p>
          <p className="hidden md:block">Register Date</p>
          <p className="text-center">Action</p>
        </div>

        {items.map((item) => {
          const isAdmin = item.role?.toLowerCase() === "admin";

          return (
            // ✅ Wrap the whole row in a div
            <div
              key={item._id}
              className={`border-b transition ${
                isAdmin ? "bg-green-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="grid grid-cols-3 md:grid-cols-5 items-start md:items-center py-3 px-4 gap-2">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{item.userName}</p>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <p className="truncate">{item.Email}</p>
                </div>

                {/* Role */}
                <div className="hidden md:flex flex-col gap-1">
                  <p
                    className={`capitalize font-semibold ${
                      isAdmin ? "text-green-700" : ""
                    }`}
                  >
                    {item.role}
                  </p>
                </div>

                {/* Register Date */}
                <div className="hidden md:flex flex-col gap-1">
                  <p className="text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-center md:justify-start items-start md:items-center mt-2 md:mt-0">
                  <button
                    disabled={isAdmin}
                    onClick={() => !isAdmin && deleteCartItem(item._id)}
                    className={`p-2 rounded-md flex items-center gap-2
                  ${
                    isAdmin
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  >
                    <Trash size={18} /> <span className="hidden md:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Showuser;