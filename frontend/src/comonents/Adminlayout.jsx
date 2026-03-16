import React from "react";
import { Outlet, Link } from "react-router-dom";
import Back from "../assets/side.jpg";

function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-gray-900 text-white p-6 md:sticky md:top-0 md:h-screen">

        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          Admin Panel
        </h1>

        <ul className="flex flex-col md:flex-col gap-4">

          <li>
            <Link
              to="/admin/showuser"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600 text-center md:text-left"
            >
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/addproduct"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600 text-center md:text-left"
            >
              ➕ Add Product
            </Link>
          </li>

          <li>
            <Link
              to="/admin/deleteproduct"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600 text-center md:text-left"
            >
              ➖ Remove Product
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600 text-center md:text-left"
            >
              📦 Orders
            </Link>
          </li>

        </ul>
      </div>

      {/* CONTENT */}
      <main
        className="flex-1 p-6 bg-gray-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Back})` }}
      >
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;