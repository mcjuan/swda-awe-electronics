export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stockStatus: "in-stock" | "out-of-stock";
}

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category_id: number;
// }
