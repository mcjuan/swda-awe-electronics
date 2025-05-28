class Order {
  constructor(db) {
    this.db = db;
  }

  create({ user_id, total, order_items, tracking_info, payment }) {
    return new Promise((resolve, reject) => {
      const orderItemsStr = JSON.stringify(order_items);
      const trackingInfoStr = JSON.stringify(tracking_info);
      const paymentInfoStr = JSON.stringify(payment);
      const orderQuery = `
        INSERT INTO "Order" (user_id, total, order_items, tracking_info, payment)
        VALUES (?, ?, ?, ?, ?)
      `;
      this.db.run(
        orderQuery,
        [user_id, total, orderItemsStr, trackingInfoStr, paymentInfoStr],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ order_id: this.lastID });
        }
      );
    });
  }
  // Fetch all orders for a given user_id
  getOrdersByUserId(user_id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "Order" WHERE user_id = ? ORDER BY id DESC`;
      this.db.all(query, [user_id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        // Parse JSON fields before returning
        const orders = rows.map((order) => ({
          ...order,
          order_items: JSON.parse(order.order_items),
          tracking_info: JSON.parse(order.tracking_info),
          payment: JSON.parse(order.payment),
        }));
        resolve(orders);
      });
    });
  }
}

export default Order;
