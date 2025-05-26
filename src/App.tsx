import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DashboardPage from "./pages/DashboardPage";
import AdminProductPage from "./pages/AdminProductPage";

// Route Guards
import AdminRoute from "./lib/AdminRoute";
import CustomerRoute from "./lib/CustomerRoute";
import UserRoute from "./lib/UserRoute";

// Dummy data setup
import { initializeDummyProducts } from "@/services/productService";

function App() {
  useEffect(() => {
    initializeDummyProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-4 pb-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />

          {/* Customer-only routes */}
          <Route
            path="/cart"
            element={
              <CustomerRoute>
                <CartPage />
              </CustomerRoute>
            }
          />

          {/* Shared profile route (admin + customer) */}
          <Route
            path="/profile"
            element={
              <UserRoute>        {/* ✅ allows any logged-in user */}
                <ProfilePage />
              </UserRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/adminProduct"
            element={
              <AdminRoute>
                <AdminProductPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
