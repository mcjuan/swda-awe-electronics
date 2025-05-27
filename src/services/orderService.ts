import type { Order } from "@/types/order";

export async function placeOrder(order: Order) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/createOrder`,
    {
      method: "POST",
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
