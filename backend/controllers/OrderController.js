import sqlite3 from "sqlite3";
import Order from "../models/Order.js";

class OrderController {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  createOrder = async (req, res) => {
    const { order_items, tracking_info, total, user_id, payment } = req.body;
    try {
      const result = await this.orderModel.create({
        user_id,
        total,
        order_items,
        tracking_info,
        payment,
      });
      return res.status(201).json({
        success: true,
        message: "Order created successfully.",
        order_id: result.order_id,
        tracking_info,
      });
    } catch (err) {
      console.error("Order insert error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Database error creating order.",
      });
    }
  };
}

export default OrderController;
