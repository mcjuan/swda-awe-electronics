import { User, ShoppingCart, Home, LogOut, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import CartSideBar from "./CartSideBar";
import { useState } from "react";

function Header() {
  const { currentUser, logout, isLoading } = useAuth();
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
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
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-2 sm:px-3 rounded-md text-sm font-medium flex items-center"
            title="Home"
          >
            <Home size={18} />
            <span className="hidden sm:ml-1 sm:inline">Home</span>
          </Link>

          {/* Cart button for non-admins */}
          {currentUser?.role !== "administrator" && (
            <>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-2 sm:px-3 rounded-md text-sm font-medium flex items-center"
                title="Cart"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:ml-1 sm:inline">Cart</span>
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
                  className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-2 sm:px-3 rounded-md text-sm font-medium flex items-center"
                  title="Dashboard"
                >
                  <User size={18} />
                  <span className="hidden sm:ml-1 sm:inline">Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-2 sm:px-3 rounded-md text-sm font-medium flex items-center"
                  title="Profile"
                >
                  <User size={18} />
                  <span className="hidden sm:ml-1 sm:inline">Profile</span>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoading}
                className="text-gray-600 hover:text-blue-600 flex items-center px-2 py-2 sm:px-3"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:ml-1 sm:inline">
                  {isLoading ? "..." : "Logout"}
                </span>
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-2 sm:px-3 rounded-md text-sm font-medium flex items-center"
                title="Login"
              >
                <User size={18} />
                <span className="hidden sm:ml-1 sm:inline">Login</span>
              </Link>
              {/* <Link
                to="/register"
                className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-2 sm:px-3 rounded-md text-sm font-medium flex items-center"
                title="Register"
              >
                <UserPlus size={18} />
                <span className="hidden sm:ml-1 sm:inline">Register</span>
              </Link> */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
