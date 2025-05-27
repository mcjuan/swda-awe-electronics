import Product from "../models/Product.js";

class ProductController {
  constructor(Product) {
    this.productModel = Product;
  }

  getAllProducts = (req, res) => {
    this.productModel.fetchProducts((err, products) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve products from the database.",
        });
      }
      return res.status(200).json({
        success: true,
        products: products,
      });
    });
  };
}

export default ProductController;
