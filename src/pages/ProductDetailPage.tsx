import React, { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react"; // <-- Import Lucide icon

const ProductDetailPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as Product;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart({ id: product.id, quantity });
      toast(<span className="text-xl font-bold">Added to cart</span>, {
        description: (
          <span className="text-lg">
            x{quantity} {product.name} was added to your cart.
          </span>
        ),
        position: "bottom-right",
        duration: 3000,
        className: "min-w-[320px] py-6",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4">
        <Button
          variant="ghost"
          className="flex items-center gap-4 text-gray-700 hover:text-gray-900 px-4 py-4"
          style={{ fontSize: "2rem", height: "2.5rem", width: "2.5rem" }}
          onClick={() => navigate("/")}
        >
          <ArrowLeft
            style={{
              width: "2rem",
              height: "2rem",
              minWidth: "2rem",
              minHeight: "2rem",
              maxWidth: "2rem",
              maxHeight: "2rem",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            className=""
          />
          <span className="sr-only">Back to home</span>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start"></div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/noImageAvailable.jpeg";
              }}
            />
          ) : (
            <img
              src="/images/noImageAvailable.jpeg"
              alt="No image available"
              className="h-full w-full object-contain object-center bg-gray-200"
            />
          )}
        </div>

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

          <p
            className={`text-md font-semibold mb-6 ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"} (Qty:{" "}
            {product.stock})
          </p>

          <div className="flex items-center gap-3 mb-2">
            <Input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Math.min(product.stock, Number(e.target.value)))
                )
              }
              className="w-24"
              disabled={product.stock === 0}
            />
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || quantity < 1}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
