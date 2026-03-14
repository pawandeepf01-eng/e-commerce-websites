import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Lazy components
const Navbar = lazy(() => import("./comonents/Navbar"));
const Home = lazy(() => import("./comonents/home"));
const About = lazy(() => import("./comonents/About"));
const Shop = lazy(() => import("./comonents/Shop"));
const Footer = lazy(() => import("./comonents/Footer"));
const Join = lazy(() => import("./comonents/Join"));
const Products = lazy(() => import("./comonents/Products"));
const Register = lazy(() => import("./comonents/Register"));
const Login = lazy(() => import("./comonents/Login"));
const AdminProtectedRoute = lazy(() => import("./comonents/Adminprotecting"));
const Admin = lazy(() => import("./comonents/Admin"));
const Checkout = lazy(() => import("./comonents/Checkout"));
const Order = lazy(() => import("./comonents/order"));
const AdminLayout = lazy(() => import("./comonents/Adminlayout"));
const UserProtectedRoute = lazy(() => import("./comonents/userprotecting"));
const Deleteproduct = lazy(() => import("./comonents/Deleteproduct"));
const Userorder = lazy(() => import("./comonents/userorder"));
const Showuser = lazy(() => import("./comonents/Showuser"));

function App() {

  const router = createBrowserRouter([
    // PUBLIC ROUTES
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    // PROTECTED ROUTES
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <UserProtectedRoute>
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        </UserProtectedRoute>
      ),
    },
    {
      path: "/shop",
      element: (
        <UserProtectedRoute>
          <>
            <Navbar />
            <Shop />
            <Footer />
          </>
        </UserProtectedRoute>
      ),
    },
    {
      path: "/join",
      element: (
        <UserProtectedRoute>
          <Join />
        </UserProtectedRoute>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <UserProtectedRoute>
          <>
            <Navbar />
            <Products />
            <Footer />
          </>
        </UserProtectedRoute>
      ),
    },
    {
      path: "/checkout/:id",
      element: (
        <UserProtectedRoute>
          <>
            <Navbar />
            <Checkout />
            <Footer />
          </>
        </UserProtectedRoute>
      ),
    },
    {
      path: "/userorder",
      element: (
        <UserProtectedRoute>
          <>
            <Navbar />
            <Userorder />
            <Footer />
          </>
        </UserProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <AdminProtectedRoute>
          <>
            <Navbar />
            <AdminLayout />
            <Footer />
          </>
        </AdminProtectedRoute>
      ),
      children: [
        { path: "showuser", element: <Showuser /> },
        { path: "addproduct", element: <Admin /> },
        { path: "deleteproduct", element: <Deleteproduct /> },
        { path: "orders", element: <Order /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen text-xl font-bold">
            Loading...
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;