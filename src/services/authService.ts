import type { Account, UserRole } from "@/types/user";

const mockUserDatabase: Account[] = [];

const findUserByEmail = (email: string): Account | undefined => {
  return mockUserDatabase.find((user) => user.email === email.toLowerCase());
};

export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface RegistrationData extends AuthCredentials {
  role: UserRole;
}

export const registerUser = async (
  data: RegistrationData
): Promise<{ success: boolean; message: string; user?: Account }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!data.email || !data.password) {
    return { success: false, message: "Email and password are required." };
  }
  if (data.password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  if (findUserByEmail(data.email)) {
    return { success: false, message: "User with this email already exists." };
  }

  const newUser: Account = {
    id: `user-${Date.now()}`,
    email: data.email.toLowerCase(),
    role: data.role,
  };
  mockUserDatabase.push(newUser);
  const { ...userForState } = newUser;
  return {
    success: true,
    message: "Registration successful!",
    user: userForState,
  };
};

export const loginUser = async (
  credentials: AuthCredentials
): Promise<{ success: boolean; message: string; user?: Account }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const user = findUserByEmail(credentials.email);

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }
  if (!credentials.password) {
    return { success: false, message: "Password is required." };
  }
  const { ...userForState } = user;
  return { success: true, message: "Login successful!", user: userForState };
};

export const logoutUser = async (): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { success: true };
};
