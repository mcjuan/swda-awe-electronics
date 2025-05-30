import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadInvoicePDF } from "@/services/invoiceService";
import { useAuth } from "@/context/AuthContext";

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <p>You must be logged in to view order details.</p>
      </div>
    );
  }

  useEffect(() => {
    // Try to get the order from location.state (if navigated from ProfilePage)
    if (location.state && location.state.orders && orderId) {
      const found = location.state.orders.find(
        (o: Order) => String(o.id) === String(orderId)
      );
      if (found) {
        setOrder(found);
        return;
      }
    }
    // Fallback: try to get from sessionStorage (if user refreshed)
    const cachedOrders = sessionStorage.getItem("user_orders");
    if (cachedOrders && orderId) {
      try {
        const orders: Order[] = JSON.parse(cachedOrders);
        const found = orders.find((o) => String(o.id) === String(orderId));
        if (found) {
          setOrder(found);
          return;
        }
      } catch {}
    }
    // If not found, go back to profile
    navigate("/profile");
  }, [orderId, location.state, navigate]);

  if (!order) {
    return <div className="p-6 text-black">Order not found.</div>;
  }

  // Sort tracking events by timestamp
  const timeline = Object.entries(order.tracking_info || {}).sort(
    ([t1], [t2]) => new Date(t1).getTime() - new Date(t2).getTime()
  );

  // Prepare customer info if available
  const customer =
    order.payment && order.payment.billingAddress
      ? {
          name: order.payment.name,
          address1: order.payment.billingAddress.address1,
          address2: order.payment.billingAddress.address2,
          city: order.payment.billingAddress.city,
          state: order.payment.billingAddress.state,
          postcode: order.payment.billingAddress.postcode,
        }
      : undefined;

  // Format order placed date in local timezone
  const orderDateString = order.created_at
    ? new Date(order.created_at.replace(" ", "T") + "Z").toLocaleString()
    : "-";

  const handleDownloadPDF = () => {
    downloadInvoicePDF({
      orderId: order.id,
      orderDate: orderDateString,
      customer,
      items: order.order_items,
      total: order.total,
    });
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 text-black">
      <div className="w-full max-w-5xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="font-semibold">Placed:</span> {orderDateString}
            </div>
            <div>
              <span className="font-semibold">Total:</span> $
              {order.total.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {order.order_items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between border-b pb-2 last:border-none"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tracking Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {timeline.map(([time, event]) => (
              <div key={time} className="flex items-start space-x-3">
                <div className="w-48 text-sm text-gray-600">{time}</div>
                <div className="font-medium">{event}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Profile
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <Button onClick={handleDownloadPDF}>Download Invoice</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
