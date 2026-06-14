import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useStore } from "../context/StoreContext";
import { Badge, Button } from "./ui";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product, mobileCompact = false }: { product: Product; mobileCompact?: boolean }) {
  const { addToCart, openQuote, toggleWishlist, wishlist } = useStore();
  const saved = wishlist.some((item) => item.id === product.id);
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.22 }} className="group min-w-0 overflow-hidden rounded-2xl border border-line bg-panel shadow-xl shadow-black/10">
      <div className="relative">
        <Link to={`/products/${product.slug}`} aria-label={`View ${product.name}`}><ProductVisual product={product} compact={mobileCompact} /></Link>
        {product.bestseller && <Badge className="absolute left-3 top-3 border-blue-400 bg-blue-600 text-white">Bestseller</Badge>}
        <button onClick={() => toggleWishlist(product)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-slate-950/60 text-slate-300 backdrop-blur hover:text-rose-400" aria-label="Toggle wishlist">
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/products/${product.slug}`} className="line-clamp-1 font-bold text-white hover:text-blue-400">{product.shortName}</Link>
            <p className="mt-1 line-clamp-1 text-xs tracking-wide text-slate-500">{product.category} · {product.phase}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs text-amber-400"><Star className="h-3.5 w-3.5" fill="currentColor" /> {product.rating}</span>
        </div>
        <p className="mt-4 text-xl font-extrabold text-ember">{product.priceLabel}</p>
        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" />{product.stock}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => addToCart(product)} className="px-3"><ShoppingCart className="h-4 w-4" /><span className="hidden sm:inline">Add to </span>Cart</Button>
          <Button variant="outline" onClick={() => openQuote(product)}>Quote</Button>
        </div>
      </div>
    </motion.article>
  );
}
