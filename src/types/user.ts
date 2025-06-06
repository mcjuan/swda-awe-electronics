export type UserRole = "customer" | "administrator";

export interface Account {
  id: number;
  username: string;
  phone: string;
  email: string;
  role: string;
}

export interface Customer extends Account {
  role: "customer";
}

export interface Administrator extends Account {
  role: "administrator";
}

export type AuthenticatedUser = Customer | Administrator;
