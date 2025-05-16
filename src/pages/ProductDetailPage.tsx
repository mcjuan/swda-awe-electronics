import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "@/types/product";
import { fetchProductById } from "@/services/productService";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        if (data) {
          setProduct(data);
          setError(null);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading product details...
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

  if (!product) {
    // This case should ideally be covered by the error state, but as a fallback
    return (
      <div className="container mx-auto p-4 text-center">
        Product not available.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Section */}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/noImageAvailable.jpeg";
              }}
            />
          ) : (
            <img
              src="/images/noImageAvailable.jpeg"
              alt="No image available"
              className="h-full w-full object-cover object-center bg-gray-200"
            />
          )}
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>
          <p className="text-2xl lg:text-3xl text-gray-800 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.category && (
            <p className="text-sm text-gray-500 mb-1">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {product.category}
              </span>
            </p>
          )}

          <p
            className={`text-md font-semibold mb-6 ${
              product.stockStatus === "in-stock"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.stockStatus === "in-stock" ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
