import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 relative min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      {showAlert && currentUser?.role === "administrator" && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white rounded shadow-lg px-6 py-4 w-96 max-w-full text-center">
            <h2 className="font-semibold text-lg mb-2">Welcome back</h2>
            <p>
              Hello Admin <strong>{currentUser.username}</strong>, welcome back.
            </p>
            <button
              className="mt-4 text-sm text-blue-400 hover:underline"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <p>This is your admin dashboard. Add your management tools here.</p>
    </div>
  );
};

export default DashboardPage;
