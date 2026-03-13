// Checkout.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams(); // get product id from URL

  // State to store cart items
  const [cartItems, setCartItems] = useState([]);
  const [productitem, setproductitem] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://backend-api-cl99.onrender.com/api/products/${id}`);
        setproductitem(res.data);
        setCartItems([]);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      }
    };
    fetchProduct();
  }, [id]);
  

  

  // Fetch cart items from backend on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("https://backend-api-cl99.onrender.com/api/cart");
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Send order to backend
      const res = await axios.post("https://backend-api-cl99.onrender.com/api/addorder", {
        productname: productitem.name,
        price: productitem.price,
        img: productitem.img,
        customerName: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      }, {
    withCredentials: true
  });

      toast.success("Order placed successfully!");

      // Clear cart items from frontend
      setCartItems([]);

      reset();
      navigate("/")
    } catch(err) {
      // console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Items Section */}
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          // Horizontal scrollable cart
          <div className="flex gap-4 overflow-x-auto py-2 overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center p-2 bg-white rounded shadow min-w-[150px] "
              >
                <img
                  src={`https://backend-api-cl99.onrender.com/uploads/${item.img}`}
                  alt={item.name}
                  className="h-28 w-28 object-cover rounded mb-2"
                />
                <span className="font-semibold text-center">{item.name}</span>
                <span className="text-blue-600 font-bold">₹{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping Form */}
      <form
        className="w-full max-w-3xl bg-white p-6 rounded shadow-md flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold">Shipping Details</h2>

        <div>
          {productitem && (
            <div key={productitem._id} className="flex justify-center gap-10">
              <img
                src={`https://backend-api-cl99.onrender.com/uploads/${productitem.img}`}
                alt={productitem.name}
                className="h-28 w-28 object-cover rounded mb-2"
              />
              <div className=" p-4">
                <h1 className="font-semibold text-center">
                  {productitem.name}
                </h1>
                <h1 className="text-blue-600 font-bold">
                  ₹{productitem.price}
                </h1>
              </div>
            </div>
          )}
        </div>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          className="border p-2 rounded"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}

        {/* Phone */}
        <input
          type="number"
          placeholder="Phone Number"
          className="border p-2 rounded"
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        {/* Place Order Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition mt-4"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
