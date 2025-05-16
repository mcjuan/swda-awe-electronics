import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/product/:productId"
            element={<ProductDetailPage />}
          />{" "}
        </Routes>
      </main>
    </>
  );
}

export default App;
