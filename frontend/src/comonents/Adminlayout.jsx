import React from "react";
import { Outlet, Link } from "react-router-dom";
import Back from "../assets/side.jpg";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* LEFT STICKY SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/admin/showuser"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addproduct"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600"
            >
              ➕ Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/deleteproduct"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600"
            >
              ➖ Remove Product
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="block p-3 bg-gray-700 rounded hover:bg-gray-600"
            >
              📦 Orders
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <main
        className="flex-1 p-6 bg-gray-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `URL(${Back})` }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
