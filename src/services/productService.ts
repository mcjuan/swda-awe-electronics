import type { Product } from "@/types/product";

const initialDummyProducts: Product[] = [
  {
    id: "laptop-001",
    name: "Modern Work Laptop 14-inch",
    description:
      "A reliable and sleek 14-inch laptop, perfect for everyday tasks, study, and professional work. Features a vibrant display and long battery life.",
    price: 1299.99,
    category: "Laptops",
    stockStatus: "in-stock",
    imageUrl:
      "https://au-media.apjonlinecdn.com/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/c/0/c08689354.png",
  },
  {
    id: "headphones-002",
    name: "Wireless BT Headphones",
    description:
      "High-fidelity wireless Bluetooth headphones with noise cancellation and long-lasting battery.",
    price: 199.5,
    category: "Audio",
    stockStatus: "in-stock",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=SmFOSTFzWmdkMW1XWjFUWXBDRzdBd2tuVHYzMERCZURia3c5SzJFOTlPZ3oveDdpQVpwS0ltY2w2UW05aU90T0huV2F0aExud1Z0YndiMUgwNXJZQnc",
  },
  {
    id: "mouse-003",
    name: "Ergonomic Wireless Mouse",
    description:
      "Comfortable ergonomic wireless mouse with adjustable DPI settings.",
    price: 49.99,
    category: "Accessories",
    stockStatus: "out-of-stock",
    // No imageUrl to test fall back
  },
  {
    id: "keyboard-004",
    name: "Mechanical Gaming Keyboard",
    description:
      "RGB backlit mechanical keyboard with responsive switches for an enhanced gaming experience.",
    price: 120.0,
    category: "Accessories",
    stockStatus: "in-stock",
    imageUrl:
      "https://m.media-amazon.com/images/I/61Ddy8RofSL._AC_UF894,1000_QL80_.jpg",
  },
];

const dummyProducts: Product[] = [];

export const fetchProducts = async (): Promise<Product[]> => {
  if (dummyProducts.length === 0) {
    initializeDummyProducts();
  }
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...dummyProducts];
};

export const fetchProductById = async (
  id: string | number
): Promise<Product | undefined> => {
  if (dummyProducts.length === 0) {
    initializeDummyProducts();
  }
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyProducts.find((product) => product.id === id);
};

export const addProduct = async (
  productData: Omit<Product, "id" | "imageUrl"> & { imageUrl?: string }
): Promise<Product> => {
  if (dummyProducts.length === 0) {
    initializeDummyProducts();
  }
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    imageUrl:
      productData.imageUrl ||
      "https://via.placeholder.com/400x300.png/6c757d/ffffff?text=New+Product",
    ...productData,
  };
  dummyProducts.push(newProduct);
  return newProduct;
};

// initializeDummyProducts function
export const initializeDummyProducts = () => {
  if (dummyProducts.length === 0) {
    initialDummyProducts.forEach((p) => dummyProducts.push(p));
    console.log("Dummy products have been initialized.");
  }
};
