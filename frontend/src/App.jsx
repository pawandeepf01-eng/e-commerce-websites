import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./comonents/Navbar";
import Home from "./comonents/home";
import About from "./comonents/About";
import Shop from "./comonents/Shop";
import Footer from "./comonents/Footer";
import Join from "./comonents/Join";
import Products from "./comonents/Products";
import Register from "./comonents/Register";
import Login from "./comonents/Login";
import AdminProtectedRoute from "./comonents/Adminprotecting";
import Admin from "./comonents/Admin";
import Checkout from "./comonents/Checkout";
import Order from "./comonents/order";
import AdminLayout from "./comonents/Adminlayout";
import UserProtectedRoute from "./comonents/userprotecting";
import Deleteproduct from "./comonents/Deleteproduct";
import Userorder from "./comonents/userorder";
import { Toaster } from "react-hot-toast";
import Showuser from "./comonents/Showuser";

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
          <Navbar />
          <AdminLayout />
          <Footer />
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
