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
}

export default Order;
