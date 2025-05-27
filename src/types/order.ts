import type { CartItem } from "./cartItem";

export interface Order {
  id?: number;
  order_items: CartItem[];
  tracking_info?: Record<string, string>;
  total: number;
  user_id: number;
  created_at?: string;
  payment?: Record<string, any>;
}
