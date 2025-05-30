import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchAllOrders } from "@/services/orderService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const timeRanges = [
  { label: "Past Month", value: "month" },
  { label: "3 Months", value: "3months" },
  { label: "6 Months", value: "6months" },
  { label: "YTD", value: "ytd" },
  { label: "1 Year", value: "year" },
];

function filterOrdersByRange(orders: any[], range: string) {
  const now = new Date();
  let from: Date;
  if (range === "month") {
    from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  } else if (range === "3months") {
    from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  } else if (range === "6months") {
    from = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  } else if (range === "ytd") {
    // Financial year starts July 1st
    const fyStart =
      now.getMonth() >= 6
        ? new Date(now.getFullYear(), 6, 1)
        : new Date(now.getFullYear() - 1, 6, 1);
    from = fyStart;
  } else {
    from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  }
  return orders.filter((order) => {
    if (!order.created_at) return false;
    const orderDate = new Date(order.created_at.replace(" ", "T") + "Z");
    return orderDate >= from && orderDate <= now;
  });
}

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState("month");

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllOrders();
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

  const filteredOrders = filterOrdersByRange(orders, selectedRange);
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  return (
    <div className="p-6 relative min-h-screen">
      <div className="max-w-5xl mx-auto flex items-center mb-6">
        <h1
          className="text-3xl font-bold mr-6 flex-shrink-0"
          style={{ lineHeight: "1.2" }}
        >
          Admin Dashboard
        </h1>
        {/* Optionally, add a divider or leave space */}
      </div>
      <Card className="max-w-5xl mx-auto mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Total Revenue</CardTitle>
          <div className="flex gap-2 flex-wrap">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                size="sm"
                variant={selectedRange === range.value ? "default" : "outline"}
                onClick={() => setSelectedRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            $
            {totalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Revenue for selected period
          </div>
        </CardContent>
      </Card>
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
            <ScrollArea className="w-full max-h-[500px] overflow-x-auto">
              <table className="min-w-full text-black">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2">Order #</th>
                    <th className="text-left px-4 py-2">User ID</th>
                    <th className="text-left px-4 py-2">User Name</th>
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
                        {order.payment?.name || "-"}
                      </td>
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
