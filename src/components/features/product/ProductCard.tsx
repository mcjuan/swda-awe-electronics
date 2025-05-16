import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
    >
      <div className="flex flex-col h-full p-4">
        {" "}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:h-48 mb-4">
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
        <div className="flex flex-col flex-grow">
          <h2
            className="text-xl font-semibold mb-1 truncate"
            title={product.name}
          >
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-2 flex-grow">
            {product.description.length > 80
              ? `${product.description.substring(0, 77)}...`
              : product.description}
          </p>
          <div className="mt-auto">
            <p className="text-lg font-bold text-gray-900 mb-1">
              ${product.price.toFixed(2)}
            </p>
            <p
              className={`text-xs font-medium ${
                product.stockStatus === "in-stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.stockStatus === "in-stock" ? "IN STOCK" : "OUT OF STOCK"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
