import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { downloadInvoicePDF } from "@/services/invoiceService";

const InvoicePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Get order data from navigation state
  const { form, cart, total, order } = location.state || {};

  if (!form || !cart) {
    navigate("/", { replace: true });
    return null;
  }

  // Get order placed date
  const orderDate = new Date();
  const orderDateString = orderDate.toLocaleString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDownloadPDF = () => {
    downloadInvoicePDF({
      orderId: order?.id, // optional
      orderDate: orderDateString,
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        postcode: form.postcode,
      },
      items: cart,
      total: total,
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div ref={invoiceRef} className="bg-white rounded-lg shadow p-6 mb-6">
        {/* Store Info */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold mb-5">AWE Electronics</h2>
          <div className="mb-1">ABN: 12 345 678 910</div>
          <div className="mb-1">Hawthorn, Victoria</div>
          <div>support@awe-electronics.com.au</div>
        </div>
        <h1 className="text-3xl font-bold mb-5">Order Summary</h1>
        <div className="mb-4">
          <div>
            <span className="font-semibold">Order placed:</span>{" "}
            {orderDateString}
          </div>
          <div>
            <span className="font-semibold">Name:</span> {form.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {form.email}
          </div>
          <div>
            <span className="font-semibold">Phone:</span> {form.phone}
          </div>
          <div>
            <span className="font-semibold">Address:</span> {form.address1}{" "}
            {form.address2 && `, ${form.address2}`}, {form.city}, {form.state}{" "}
            {form.postcode}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left border-b font-semibold">
                    Product
                  </th>
                  <th className="px-4 py-2 text-center border-b font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-right border-b font-semibold">
                    Price
                  </th>
                  <th className="px-4 py-2 text-right border-b font-semibold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: any) => (
                  <tr key={item.id} className="align-top">
                    <td className="px-4 py-4 border-b">{item.name}</td>
                    <td className="px-4 py-4 text-center border-b">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 text-right border-b">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-right border-b">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-2 text-right font-bold border-t"
                  >
                    Total:
                  </td>
                  <td className="px-4 py-2 text-right font-bold border-t">
                    ${total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Button onClick={handleDownloadPDF} className="w-full">
        Download Invoice as PDF
      </Button>
    </div>
  );
};

export default InvoicePage;
