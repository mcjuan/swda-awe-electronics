class Product {
  constructor(db) {
    this.db = db;
  }
  fetchProducts(callback) {
    const query = "SELECT * FROM product";
    this.db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error fetching products from database:", err.message);
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }
}

export default Product;
