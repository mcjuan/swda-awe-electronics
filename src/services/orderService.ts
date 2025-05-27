import type { Order } from "@/types/order";

export async function placeOrder(order: Order) {
    // Adjust the URL as needed for your backend
    const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error("Failed to place order");
    }
    return await response.json();
}