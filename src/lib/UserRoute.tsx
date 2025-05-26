import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default UserRoute;
