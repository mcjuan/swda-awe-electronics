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

  getOrdersByUserId = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required in the request body.",
      });
    }

    try {
      const uid = Number(user_id);
      const orders = await this.orderModel.getOrdersByUserId(uid);
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (err) {
      console.error("Order fetch error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Database error fetching orders.",
      });
    }
  };

  getAllOrders = async (req, res) => {
    try {
      const orders = await this.orderModel.getAllOrders();
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (err) {
      console.error("Order fetch error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Database error fetching all orders.",
      });
    }
  };
}

export default OrderController;
