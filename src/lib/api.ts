import axios from "axios";
import type { Product } from "../types";

export const apiClient = axios.create({
  baseURL: "/",
  timeout: 8000,
});

export async function fetchProducts() {
  const response = await apiClient.get<Product[]>("data/products.json");
  return response.data;
}
