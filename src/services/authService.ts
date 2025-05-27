export interface AuthCredentials {
  username: string;
  password: string;
}

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

// --- Register a new user ---
export const registerUser = async (
  data: RegistrationData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to connect to server." };
  }
};

// --- Login a user ---
export const loginUser = async (
  credentials: AuthCredentials
): Promise<{ success: boolean; message: string; user?: any }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to connect to server." };
  }
};

// --- Logout (stub) ---
export const logoutUser = async (): Promise<void> => {
  // Stub for future use
  return Promise.resolve();
};
