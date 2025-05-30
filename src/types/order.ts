import type { OrderItem } from "./orderItem";

export interface Order {
  id?: number;
  order_items: OrderItem[];
  tracking_info?: Record<string, string>;
  total: number;
  user_id: number;
  created_at?: string;
  payment?: Record<string, any>;
}
