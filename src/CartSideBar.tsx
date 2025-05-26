import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { fetchProducts } from "@/services/productService";
import type { Product } from "@/types/product";
import { Link } from "react-router-dom";

interface CartSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSideBar: React.FC<CartSideBarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchProducts().then(setProducts);
    }
  }, [isOpen]);

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

  // Handle quantity change for a cart item
  const handleQuantityChange = (id: number, value: number, stock: number) => {
    if (value < 1 || value > stock) return;
    // Set the new quantity by replacing the item
    addToCart({
      id,
      quantity: value - (cartItems.find((i) => i.id === id)?.quantity ?? 0),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[40rem] max-w-full"
        style={{ maxWidth: "100vw" }}
      >
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetClose asChild>
            {/* Only one close button in the SheetHeader */}
          </SheetClose>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto p-4">
          {cartDetails.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartDetails.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardHeader className="flex items-center">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <div className="flex-grow">
                    <CardTitle className="text-sm font-medium">
                      {item.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
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
                        style={{
                          MozAppearance: "textfield",
                        }}
                        className="w-14 h-7 px-2 py-1 text-center"
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
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <Link to="/cart">
            <Button className="w-full mb-2" variant="outline" onClick={onClose}>
              View Full Cart
            </Button>
          </Link>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <Button className="w-full" onClick={onClose}>
              Go to Checkout
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSideBar;
