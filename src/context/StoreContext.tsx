import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product, QuoteRequest } from "../types";

type StoreState = {
  cart: CartItem[];
  wishlist: Product[];
  quotes: QuoteRequest[];
  quoteProduct?: Product;
  quoteOpen: boolean;
  toast: string;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  openQuote: (product?: Product) => void;
  closeQuote: () => void;
  submitQuote: (quote: Omit<QuoteRequest, "id" | "createdAt">) => void;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreState | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage("pm-cart", []));
  const [wishlist, setWishlist] = useState<Product[]>(() => readStorage("pm-wishlist", []));
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => readStorage("pm-quotes", []));
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product>();
  const [toast, setToast] = useState("");

  useEffect(() => localStorage.setItem("pm-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("pm-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("pm-quotes", JSON.stringify(quotes)), [quotes]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const value = useMemo<StoreState>(() => ({
    cart,
    wishlist,
    quotes,
    quoteProduct,
    quoteOpen,
    toast,
    addToCart(product) {
      setCart((items) => {
        const existing = items.find((item) => item.product.id === product.id);
        return existing
          ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
          : [...items, { product, quantity: 1 }];
      });
      notify(`${product.shortName} added to cart`);
    },
    removeFromCart(id) {
      setCart((items) => items.filter((item) => item.product.id !== id));
    },
    updateQuantity(id, quantity) {
      setCart((items) => items.map((item) => item.product.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
    },
    toggleWishlist(product) {
      const exists = wishlist.some((item) => item.id === product.id);
      setWishlist((items) => exists ? items.filter((item) => item.id !== product.id) : [...items, product]);
      notify(exists ? "Removed from wishlist" : "Saved to wishlist");
    },
    openQuote(product) {
      setQuoteProduct(product);
      setQuoteOpen(true);
    },
    closeQuote() {
      setQuoteOpen(false);
      setQuoteProduct(undefined);
    },
    submitQuote(quote) {
      const next = { ...quote, id: `PMQ-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString() };
      setQuotes((items) => [next, ...items]);
      setQuoteOpen(false);
      setQuoteProduct(undefined);
      notify("Quote request submitted successfully");
    },
    notify,
  }), [cart, wishlist, quotes, quoteProduct, quoteOpen, toast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
