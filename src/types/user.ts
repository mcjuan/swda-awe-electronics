export type UserRole = "customer" | "administrator";

export interface Account {
  id: string | number;
  email: string;
  role: UserRole;
}

export interface Customer extends Account {
  role: "customer";
}

export interface Administrator extends Account {
  role: "administrator";
}

export type AuthenticatedUser = Customer | Administrator;
