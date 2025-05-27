import type { Product } from "@/types/product";

// const API_URL = "http://localhost:3001/api/products";

const initialDummyProducts: Product[] = [];

const dummyProducts: Product[] = [];

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/products`
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch products");
  }
  const data = await response.json();
  return data.products as Product[];
};

// export const fetchProductById = async (
//   id: string | number
// ): Promise<Product | undefined> => {
//   if (dummyProducts.length === 0) {
//     initializeDummyProducts();
//   }
//   await new Promise((resolve) => setTimeout(resolve, 300));
//   return dummyProducts.find((product) => product.id === id);
// };

// export const addProduct = async (
//   productData: Omit<Product, "id" | "imageUrl"> & { imageUrl?: string }
// ): Promise<Product> => {
//   if (dummyProducts.length === 0) {
//     initializeDummyProducts();
//   }
//   await new Promise((resolve) => setTimeout(resolve, 300));
//   const newProduct: Product = {
//     id: `prod-${Date.now()}`,
//     imageUrl:
//       productData.imageUrl ||
//       "https://via.placeholder.com/400x300.png/6c757d/ffffff?text=New+Product",
//     ...productData,
//   };
//   dummyProducts.push(newProduct);
//   return newProduct;
// };

// initializeDummyProducts function
export const initializeDummyProducts = () => {
  if (dummyProducts.length === 0) {
    initialDummyProducts.forEach((p) => dummyProducts.push(p));
    console.log("Dummy products have been initialized.");
  }
};
