import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Account } from "@/types/user";
import type { AuthCredentials, RegistrationData } from "@/services/authService";
import {
  loginUser as apiLogin,
  registerUser as apiRegister,
  logoutUser as apiLogout,
} from "@/services/authService";

interface AuthContextType {
  currentUser: Account | null;
  login: (
    credentials: AuthCredentials
  ) => Promise<{ success: boolean; message: string; user?: Account }>;
  register: (
    data: RegistrationData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Account | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      localStorage.removeItem("currentUser");
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const login = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    const response = await apiLogin(credentials);

    if (response.success && response.user) {
      setCurrentUser(response.user);
    }

    setIsLoading(false);
    return {
      success: response.success,
      message: response.message,
      user: response.user,
    };
  };

  const register = async (data: RegistrationData) => {
    setIsLoading(true);
    const response = await apiRegister(data);
    setIsLoading(false);
    return { success: response.success, message: response.message };
  };

  const logout = async () => {
    setIsLoading(true);
    await apiLogout();
    setCurrentUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
