import React, { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { fetchProducts } from "@/services/productService";
import ProductCard from "@/components/features/product/ProductCard";
import { useLocation } from "react-router-dom";

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
];

const categories = [
  { id: 1, name: "CPU" },
  { id: 2, name: "STORAGE" },
  { id: 3, name: "VIDEO_CARD" },
  { id: 4, name: "CPU_COOLER" },
  { id: 5, name: "MOTHERBOARD" },
  { id: 6, name: "MEMORY" },
  { id: 7, name: "CASE" },
  { id: 8, name: "POWER_SUPPLY" },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("price-asc");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

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

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(Number(product.category_id));

    // Price filter
    const price = Number(product.price);
    const min = minPrice ? Number(minPrice) : -Infinity;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const matchesPrice = price >= min && price <= max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  };

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
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Left Panel: Filters */}
      <aside className="w-full md:w-64 mb-8 md:mb-0">
        <div className="bg-white rounded-lg shadow p-4 sticky top-24">
          <h2 className="text-lg font-semibold mb-3">Filter By</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Category</h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCategoryChange(cat.id)}
                  />
                  <span>{cat.name.replace("_", " ")}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="border rounded px-2 py-1 w-20"
                value={minPrice}
                min={0}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="border rounded px-2 py-1 w-20"
                value={maxPrice}
                min={0}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          <button
            className="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            onClick={handleClearFilters}
            type="button"
          >
            Clear Filters
          </button>
        </div>
      </aside>
      {/* Main Content: Products */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-center sm:text-left">
            Our Products
          </h1>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {sortedProducts.length === 0 && !loading ? (
          <p className="text-center">
            No products found{search ? ` for "${search}"` : ""}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
