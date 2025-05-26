import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const CustomerRoute: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "customer") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default CustomerRoute;
