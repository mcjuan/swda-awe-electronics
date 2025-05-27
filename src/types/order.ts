// Order type for placing an order

import type { CartItem } from "./cartItem";

export interface Order {
    id?: number; // optional, assigned by backend
    order_items: CartItem[];
    tracking_info?: Record<string, string>; // datetime: event string
    total: number;
    user_id: number;
    created_at?: string; // optional, assigned by backend
    payment: Record<string, any>; // JSON object for credit card details
}
