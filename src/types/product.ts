export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stockStatus: "in-stock" | "out-of-stock";
}
