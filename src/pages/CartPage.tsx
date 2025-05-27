import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
// Update the import path below to the correct location of fetchProducts
import { fetchProducts } from "@/services/productService";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

import type { Product } from "@/types/product";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // Merge cartItems with product details
  const cartDetails = cartItems
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const totalPrice = cartDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, value: number, stock: number) => {
    if (value < 1 || value > stock) return;
    addToCart({
      id,
      quantity: value - (cartItems.find((i) => i.id === id)?.quantity ?? 0),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6 mb-8">
            {cartDetails.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex items-center">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-contain mr-6"
                  />
                  <div className="flex-grow">
                    <CardTitle className="text-lg font-medium">
                      {item.name}
                    </CardTitle>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity - 1,
                            item.stock
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            Number(e.target.value),
                            item.stock
                          )
                        }
                        className="w-14 h-7 px-2 py-1 text-center"
                        style={{ MozAppearance: "textfield" }}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity + 1,
                            item.stock
                          )
                        }
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase quantity"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    Remove
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <Button className="mt-6 w-full">Go to Checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
