import { useState } from "react";
import { Check, Download, Heart, MessageCircle, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductVisual } from "../components/ProductVisual";
import { Badge, Button, Card, SectionHeading } from "../components/ui";
import { useStore } from "../context/StoreContext";
import { useProducts } from "../hooks/useProducts";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: products = [], isLoading } = useProducts();
  const { addToCart, openQuote, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((item) => item.slug === slug);
  if (isLoading) return <div className="page-shell section-pad"><div className="h-[600px] animate-pulse rounded-3xl bg-panel" /></div>;
  if (!product) return <NotFound />;
  const saved = wishlist.some((item) => item.id === product.id);
  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.featured)).slice(0, 3);
  return (
    <div>
      <div className="page-shell py-6 text-xs text-slate-600"><Link to="/products">Products</Link> / <span className="text-slate-400">{product.category}</span> / {product.shortName}</div>
      <section className="page-shell grid gap-10 pb-20 lg:grid-cols-2">
        <div><ProductVisual product={product} className="h-[360px] rounded-3xl border border-line sm:h-[520px]" /><div className="mt-3 grid grid-cols-4 gap-3">{[1,2,3,4].map((item) => <div key={item} className={`overflow-hidden rounded-xl border ${item === 1 ? "border-blue-500" : "border-line"}`}><ProductVisual product={product} compact className="h-20" /></div>)}</div></div>
        <div className="lg:py-4"><Badge>{product.category}</Badge><h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{product.name}</h1><div className="mt-4 flex items-center gap-3"><span className="flex text-amber-400">{[1,2,3,4,5].map((item) => <Star key={item} className="h-4 w-4" fill="currentColor" />)}</span><span className="text-sm text-slate-500">{product.rating} from {product.reviews} reviews</span></div><p className="mt-7 text-3xl font-extrabold text-orange-500">{product.priceLabel}</p><p className="mt-5 text-base leading-7 text-slate-400">{product.description}</p><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Capacity", product.capacity], ["Phase", product.phase], ["Efficiency", product.efficiency], ["Warranty", product.warranty]].map(([label, value]) => <div key={label} className="rounded-xl border border-line bg-panel p-3"><p className="text-[11px] uppercase tracking-wider text-slate-600">{label}</p><p className="mt-1 text-sm font-bold text-white">{value}</p></div>)}</div><div className="mt-7 flex items-center gap-3"><span className="flex h-12 items-center rounded-xl border border-line"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-full px-3"><Minus className="h-4 w-4" /></button><strong className="w-8 text-center text-white">{quantity}</strong><button onClick={() => setQuantity(quantity + 1)} className="h-full px-3"><Plus className="h-4 w-4" /></button></span><Button size="lg" className="flex-1" onClick={() => Array.from({ length: quantity }).forEach(() => addToCart(product))}><ShoppingCart className="h-5 w-5" />Add to Cart</Button><Button size="lg" variant="outline" onClick={() => toggleWishlist(product)} aria-label="Wishlist"><Heart className="h-5 w-5" fill={saved ? "currentColor" : "none"} /></Button></div><Button size="lg" variant="outline" onClick={() => openQuote(product)} className="mt-3 w-full">Request a custom quote</Button><div className="mt-7 grid gap-3 text-sm text-slate-400 sm:grid-cols-3"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />Test certificate</span><span className="flex items-center gap-2"><Truck className="h-4 w-4 text-blue-400" />Pan-India delivery</span><a href="https://wa.me/919876543210" className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-emerald-400" />Engineer on WhatsApp</a></div></div>
      </section>
      <section className="border-y border-line bg-[#050a15]"><div className="page-shell section-pad grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><SectionHeading title="Technical features" description="Designed, assembled and tested for continuous industrial duty." /><div className="mt-7 grid gap-3 sm:grid-cols-2">{product.features.map((feature) => <div key={feature} className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4 text-sm text-slate-300"><span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/10 text-emerald-400"><Check className="h-4 w-4" /></span>{feature}</div>)}</div></div><Card className="p-6"><h3 className="font-bold text-white">Documentation</h3><p className="mt-2 text-sm leading-6 text-slate-500">Download engineering information for planning and approvals.</p>{["Product brochure", "Technical datasheet", "Installation guide"].map((label) => <button key={label} className="mt-3 flex w-full items-center justify-between rounded-xl border border-line px-4 py-3 text-sm text-slate-300 hover:border-blue-500"><span>{label}</span><Download className="h-4 w-4 text-blue-400" /></button>)}</Card></div></section>
      <section className="page-shell section-pad"><SectionHeading title="Related equipment" description="Frequently specified alongside this product." /><div className="mt-9 grid gap-4 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
    </div>
  );
}
