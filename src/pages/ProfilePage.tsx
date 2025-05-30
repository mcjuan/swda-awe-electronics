import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { fetchOrderHistory } from "@/services/orderService";
import { Link } from "react-router-dom";
import type { Order } from "@/types/order";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      if (!currentUser) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchOrderHistory(currentUser.id);
        setOrders(data.orders || []);
      } catch {
        setError("Failed to fetch order history.");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        <p>You must be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 text-black">
      <div className="w-full max-w-5xl space-y-6">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black">My Profile</CardTitle>
            <CardDescription className="text-black">
              Customer Information
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
            <div>
              <span className="font-semibold">Username:</span>{" "}
              {currentUser.username}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {currentUser.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span>{" "}
              {currentUser.phone || "-"}
            </div>
            <div>
              <span className="font-semibold">Role:</span> {currentUser.role}
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black">My Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-black">
            {loading ? (
              <div>Loading orders...</div>
            ) : error ? (
              <div>{error}</div>
            ) : orders.length === 0 ? (
              <div>You have no orders yet.</div>
            ) : (
              <div className="space-y-2">
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="cursor-pointer w-full max-w-5xl mx-auto"
                  >
                    <CardContent className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Order #{order.id}</div>
                        <div className="text-sm">
                          Placed:{" "}
                          {order.created_at
                            ? new Date(
                                order.created_at.replace(" ", "T") + "Z"
                              ).toLocaleString()
                            : "N/A"}
                        </div>
                        <div className="text-sm">
                          Total: ${order.total.toFixed(2)}
                        </div>
                      </div>
                      <Link to={`/order/${order.id}`} state={{ orders }}>
                        <Button variant="outline">Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
