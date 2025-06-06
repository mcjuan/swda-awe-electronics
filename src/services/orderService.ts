import type { Order } from "@/types/order";

export async function placeOrder(order: Order) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/createOrder`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to place order");
  }
  return await response.json();
}

export async function fetchOrderHistory(user_id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/orderHistory`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    }
  );
  if (!response.ok) throw new Error("Failed to fetch order history");
  return await response.json();
}

export async function fetchAllOrders() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/orderAll`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch all orders");
  return await response.json();
}
