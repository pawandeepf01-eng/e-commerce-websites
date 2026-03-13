import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart, Trash } from "lucide-react";
import Img from "../assets/navbar.jpg";
import Logo from "../assets/logo.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import Logo1 from "../assets/logo1.jpg";

function Navbar() {
  const [profilePic, setProfilePic] = useState(null);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  let userName = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name; // 👈 extract name
    } catch (e) {
      console.log("Invalid token");
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [items, setItems] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://backend-23u8.onrender.com/api/cart",
        );
        setItems(res.data); // axios automatically parses JSON
      } catch (err) {
        console.error("Error fetching:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://backend-23u8.onrender.com/api/deletecart/${id}`,
      );
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://backend-23u8.onrender.com/api/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      toast.success("Successfully Logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <div
        className="w-full flex flex-wrap justify-between items-center bg-cover bg-no-repeat text-white px-4 sm:px-6 md:px-8 py-2"
        style={{ backgroundImage: `URL(${Img})` }}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4 md:gap-8">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer"
            onClick={() => setShowImage(true)}
          />

          {showImage && (
            <div
              onClick={() => setShowImage(false)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-10"
            >
              <img
                src={Logo}
                alt="Big view"
                className="max-w-[80%] max-h-[80%] rounded-lg shadow-2xl"
              />
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex  gap-4 md:gap-6 text-sm md:text-lg font-bold justify-evenly ">
         
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <Link className="hover:underline" to="/about">
              About
            </Link>
            <Link className="hover:underline" to="/shop">
              Shop
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <details className="dropdown">
            <summary className="btn m-1 bg-transparent shadow-none border-none text-white font-bold flex items-center gap-2">
              <User />
              <span className="hidden sm:inline">Account</span>
            </summary>

            <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm text-black">
              {/* If NO TOKEN (not logged in) → show LOGIN */}
              {!localStorage.getItem("token") && (
                <li>
                  <Link to="/login" className="flex items-center gap-2">
                    <User /> LOGIN
                  </Link>
                </li>
              )}

              {/* If TOKEN exists → show LOGOUT */}
              {localStorage.getItem("token") && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <User /> LOGOUT
                  </button>
                </li>
              )}

              {/* Show Admin only if user is admin */}
              {localStorage.getItem("role") === "admin" && (
                <li>
                  <Link to="/admin" className="flex items-center gap-2">
                    <User /> Admin
                  </Link>
                </li>
              )}
            </ul>
          </details>

          {isLoggedIn && (
            <details className="dropdown">
              <summary className="btn m-1 bg-transparent shadow-none border-none text-white font-bold flex items-center gap-2 overflow-visible">
                <img
                  src={profilePic || Logo1}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-white/30 shadow-sm"
                />
                <p className="hidden sm:inline whitespace-nowrap max-w-fit">
                  {userName}
                </p>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm text-black">
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <User /> Set picture
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setProfilePic(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </li>
                <li>
                  <Link to="/userorder" className="flex items-center gap-2">
                    <User /> Order
                  </Link>
                </li>
              </ul>
            </details>
          )}

          {role === "user" && (
            <div className="drawer drawer-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-5"
                  className="drawer-button btn btn-primary bg-transparent border-none shadow-none text-white flex items-center gap-2"
                >
                  <ShoppingCart />{" "}
                  <span className="hidden sm:inline">Cart</span>
                </label>
              </div>

              <div className="drawer-side">
                <label htmlFor="my-drawer-5" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-72 sm:w-96 p-4">
                  {items.length === 0 ? (
                    <li className="text-black text-lg sm:text-2xl text-center">
                      No items in cart
                    </li>
                  ) : (
                    items.map((item) => (
                      <div
                        className="w-full text-black flex mt-4 justify-between items-center"
                        key={item._id}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            className="h-20 w-20 sm:h-28 sm:w-28 rounded-xl"
                            src={`https://backend-23u8.onrender.com/uploads/${item.img}`}
                            alt={item.name}
                          />
                          <div className="flex flex-col gap-2 text-lg sm:text-2xl font-bold">
                            {item.name}
                            <span>₹{item.price}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteCartItem(item._id)}
                          className="p-2"
                        >
                          <Trash size={20} className="cursor-pointer" />
                        </button>
                      </div>
                    ))
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
