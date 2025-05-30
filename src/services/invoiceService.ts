import { jsPDF } from "jspdf";

interface InvoiceCustomer {
  name?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postcode?: string;
}

interface InvoiceItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface InvoiceData {
  orderId?: number | string;
  orderDate: string;
  customer?: InvoiceCustomer;
  items: InvoiceItem[];
  total: number;
}

export function downloadInvoicePDF({
  orderId,
  orderDate,
  customer,
  items,
  total,
}: InvoiceData) {
  const doc = new jsPDF();

  doc.setFont("times", "normal");
  doc.setFontSize(18);
  doc.setFont("times", "bold");
  doc.text("AWE Electronics", 14, 16);
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("ABN: 12 345 678 910", 14, 26);
  doc.text("Hawthorn, Victoria", 14, 32);
  doc.text("support@awe-electronics.com.au", 14, 38);

  doc.setFontSize(18);
  doc.setFont("times", "bold");
  doc.text("Invoice", 14, 52);
  doc.setFont("times", "normal");

  doc.setFontSize(11);
  doc.text(`Order placed: ${orderDate}`, 14, 62);
  if (orderId !== undefined) doc.text(`Order #: ${orderId}`, 14, 70);

  let y = orderId !== undefined ? 78 : 70;

  if (customer) {
    if (customer.name) {
      doc.text(`Name: ${customer.name}`, 14, y);
      y += 8;
    }
    if (customer.email) {
      doc.text(`Email: ${customer.email}`, 14, y);
      y += 8;
    }
    if (customer.phone) {
      doc.text(`Phone: ${customer.phone}`, 14, y);
      y += 8;
    }
    if (
      customer.address1 ||
      customer.address2 ||
      customer.city ||
      customer.state ||
      customer.postcode
    ) {
      doc.text(
        `Address: ${customer.address1 || ""} ${customer.address2 || ""}, ${
          customer.city || ""
        }, ${customer.state || ""} ${customer.postcode || ""}`,
        14,
        y
      );
      y += 8;
    }
  }

  y += 8;

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("Items:", 14, y);
  doc.setFont("times", "normal");
  y += 10;

  // Table header
  doc.setFont("times", "bold");
  doc.text("Product", 14, y);
  doc.text("Qty", 120, y, { align: "center" });
  doc.text("Price", 155, y, { align: "right" });
  doc.text("Total", 190, y, { align: "right" });
  doc.setFont("times", "normal");
  y += 8;

  // Table rows
  doc.setFontSize(11);

  items.forEach((item) => {
    const productLines = doc.splitTextToSize(String(item.name), 100);
    let lineY = y;
    productLines.forEach((line: string, idx: number) => {
      doc.text(line, 14, lineY);
      if (idx === 0) {
        doc.text(String(item.quantity), 120, lineY, { align: "center" });
        doc.text(`$${item.price.toFixed(2)}`, 155, lineY, { align: "right" });
        doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 190, lineY, {
          align: "right",
        });
      }
      lineY += 6;
    });
    y = lineY + 5;
  });

  // Total row
  y += 2;
  doc.setFont("times", "bold");
  doc.text("Total:", 155, y, { align: "right" });
  doc.text(`$${total.toFixed(2)}`, 190, y, { align: "right" });
  doc.setFont("times", "normal");

  // Save the PDF
  doc.save(`invoice${orderId ? `-order-${orderId}` : ""}.pdf`);
}
