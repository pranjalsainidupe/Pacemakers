export type Product = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  priceLabel: string;
  rating: number;
  reviews: number;
  stock: string;
  capacity: string;
  phase: string;
  efficiency: string;
  warranty: string;
  icon: "zap" | "box" | "wave" | "gauge" | "battery" | "settings";
  tone: "blue" | "orange" | "green" | "violet" | "cyan";
  featured?: boolean;
  bestseller?: boolean;
  description: string;
  features: string[];
};

export type CartItem = { product: Product; quantity: number };

export type QuoteRequest = {
  id: string;
  product?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  requirements: string;
  createdAt: string;
};
