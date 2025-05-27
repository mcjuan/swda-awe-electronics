import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { fetchProducts } from "@/services/productService";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/product";

const AU_STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();
  const { currentUser } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
  });

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        name: currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      }));
    }
  }, [currentUser]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow 4 numeric characters
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setForm({ ...form, postcode: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit logic
    alert("Order placed! (mock)");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Checkout Form */}
        <form
          className="bg-white rounded-lg shadow p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="phone">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="address1">
              Address Line 1
            </label>
            <Input
              id="address1"
              name="address1"
              value={form.address1}
              onChange={handleChange}
              required
              placeholder="Street address, P.O. box, company name, c/o"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="address2">
              Address Line 2
            </label>
            <Input
              id="address2"
              name="address2"
              value={form.address2}
              onChange={handleChange}
              placeholder="Apartment, suite, unit, building, floor, etc. (optional)"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium" htmlFor="city">
                City
              </label>
              <Input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium" htmlFor="state">
                State
              </label>
              <select
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select state</option>
                {AU_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-24">
              <label className="block mb-1 font-medium" htmlFor="postcode">
                Postcode
              </label>
              <Input
                id="postcode"
                name="postcode"
                value={form.postcode}
                onChange={handlePostcodeChange}
                required
                maxLength={4}
                pattern="\d{4}"
                inputMode="numeric"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            Place Order
          </Button>
        </form>

        {/* Cart Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cartDetails.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartDetails.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="flex items-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div className="flex-grow">
                      <CardTitle className="text-base font-medium">
                        {item.name}
                      </CardTitle>
                      <p className="text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
