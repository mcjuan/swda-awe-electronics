import React, { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { fetchProducts } from "@/services/productService";
import ProductCard from "@/components/features/product/ProductCard";
import { useLocation } from "react-router-dom";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
  );
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      {filteredProducts.length === 0 && !loading ? (
        <p className="text-center">
          No products found{search ? ` for "${search}"` : ""}.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
