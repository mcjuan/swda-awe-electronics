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
import CheckoutPage from "./pages/CheckoutPage";
import InvoicePage from "./pages/InvoicePage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

// Route Guards
import AdminRoute from "./lib/AdminRoute";
import CustomerRoute from "./lib/CustomerRoute";

// Dummy product initializer
import { initializeDummyProducts } from "@/services/productService";
import { Toaster } from "sonner";

function App() {
  useEffect(() => {
    initializeDummyProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-4 pb-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Customer-only routes */}
          <Route
            path="/cart"
            element={
              <CustomerRoute>
                <CartPage />
              </CustomerRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <CustomerRoute>
                <ProfilePage />
              </CustomerRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <CustomerRoute>
                <CheckoutPage />
              </CustomerRoute>
            }
          />

          <Route
            path="/invoice"
            element={
              <CustomerRoute>
                <InvoicePage />
              </CustomerRoute>
            }
          />

          <Route path="/order/:orderId" element={<OrderDetailsPage />} />

          {/* Public product details */}
          <Route path="/product/:productId" element={<ProductDetailPage />} />

          {/* Admin-only route */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
