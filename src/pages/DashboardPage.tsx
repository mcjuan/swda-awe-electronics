import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchAllOrders } from "@/services/orderService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching all orders...");

        const data = await fetchAllOrders();
        console.log("Fetched data:", data);

        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?.role === "administrator") {
      getOrders();
    }
  }, [currentUser]);

  return (
    <div className="p-6 relative min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <p className="mb-6">
        This is your admin dashboard. View all orders below.
      </p>
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading orders...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <ScrollArea className="w-full max-h-[500px]">
              <table className="min-w-full text-black">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2">Order #</th>
                    <th className="text-left px-4 py-2">User ID</th>
                    <th className="text-left px-4 py-2">Placed</th>
                    <th className="text-left px-4 py-2">Total</th>
                    <th className="text-left px-4 py-2">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-none">
                      <td className="px-4 py-2 font-semibold">#{order.id}</td>
                      <td className="px-4 py-2">{order.user_id}</td>
                      <td className="px-4 py-2">
                        {order.created_at
                          ? new Date(
                              order.created_at.replace(" ", "T") + "Z"
                            ).toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        {order.order_items
                          .map(
                            (item: any) => `${item.name} (x${item.quantity})`
                          )
                          .join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
