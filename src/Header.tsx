import { User, ShoppingCart, Home, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import CartSideBar from "./CartSideBar";
import { useState } from "react";
import Searchbar from "./Searchbar";

function Header() {
  const { currentUser, logout, isLoading } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearCart();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          AWE Electronics
        </Link>
        <div className="flex-1 flex justify-center px-4">
          <Searchbar />
        </div>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            title="Home"
          >
            <Home size={20} />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {currentUser?.role !== "administrator" && (
            <>
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                title="Cart"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <span className="ml-1 text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <CartSideBar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </>
          )}

          {currentUser ? (
            <>
              {currentUser.role === "administrator" ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  title="Dashboard"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  title="Profile"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoading}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">
                  {isLoading ? "..." : "Logout"}
                </span>
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                title="Login"
              >
                <User size={20} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
