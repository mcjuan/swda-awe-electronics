import Product from "../models/Product.js"; // Assuming Product.js is in the models folder

class ProductController {
  constructor(Product) {
    this.productModel = Product; // Or expect productModel to be passed if already instantiated
  }

  /**
   * Handles the request to get all products.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  getAllProducts = (req, res) => {
    this.productModel.fetchProducts((err, products) => {
      if (err) {
        // The model already logs the detailed error
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
