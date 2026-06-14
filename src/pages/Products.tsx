import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { Button, Input, SectionHeading } from "../components/ui";
import { useProducts } from "../hooks/useProducts";

const categoryOptions = ["All", "Servo Stabilizers", "Control Panels", "Transformers", "APFC Panels", "UPS Systems", "Industrial Automation"];

export default function Products() {
  const { data: products = [], isLoading } = useProducts();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(250000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const search = query.toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch = !search || `${product.name} ${product.category} ${product.capacity}`.toLowerCase().includes(search);
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory && product.price <= maxPrice && product.rating >= minRating;
    });
    return [...result].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : Number(b.featured) - Number(a.featured));
  }, [products, query, category, maxPrice, minRating, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const visible = filtered.slice((page - 1) * 6, page * 6);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    setParams(query ? { q: query } : {});
    setPage(1);
  }

  return (
    <div className="section-pad">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Industrial Catalog" title="Equipment built for uptime" description="Compare capacities, specifications and availability. Our engineers can validate your selection before purchase." />
          <form onSubmit={submitSearch} className="flex w-full max-w-xl gap-2"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Search products, category, capacity" /></div><Button type="submit">Search</Button></form>
        </div>

        <div className="mt-10 flex items-center justify-between border-y border-line py-4">
          <p className="text-sm text-slate-500"><strong className="text-white">{filtered.length}</strong> products found</p>
          <div className="flex gap-2"><Button variant="outline" className="lg:hidden" onClick={() => setFiltersOpen(true)}><Filter className="h-4 w-4" />Filters</Button><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 rounded-xl border border-line bg-slate-950 px-3 text-sm text-white outline-none"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block"><Filters category={category} setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice} minRating={minRating} setMinRating={setMinRating} /></aside>
          <div>
            {isLoading ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[430px] animate-pulse rounded-2xl border border-line bg-panel" />)}</div> : visible.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl border border-dashed border-line py-24 text-center"><SlidersHorizontal className="mx-auto h-10 w-10 text-slate-600" /><h2 className="mt-4 font-bold text-white">No equipment matches these filters</h2><p className="mt-2 text-sm text-slate-500">Try a broader capacity, price or category.</p></div>}
            {pages > 1 && <div className="mt-10 flex justify-center gap-2">{Array.from({ length: pages }).map((_, index) => <button key={index} onClick={() => setPage(index + 1)} className={`grid h-10 w-10 place-items-center rounded-lg border text-sm ${page === index + 1 ? "border-blue-500 bg-blue-600 text-white" : "border-line text-slate-400 hover:border-blue-500"}`}>{index + 1}</button>)}</div>}
          </div>
        </div>
      </div>
      {filtersOpen && <div className="fixed inset-0 z-[80] bg-black/70 lg:hidden"><div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-auto border-l border-line bg-[#07101e] p-5"><div className="mb-6 flex items-center justify-between"><h2 className="font-bold text-white">Filter products</h2><button onClick={() => setFiltersOpen(false)}><X className="h-6 w-6" /></button></div><Filters category={category} setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice} minRating={minRating} setMinRating={setMinRating} /><Button className="mt-8 w-full" onClick={() => setFiltersOpen(false)}>Show {filtered.length} products</Button></div></div>}
    </div>
  );
}

function Filters({ category, setCategory, maxPrice, setMaxPrice, minRating, setMinRating }: { category: string; setCategory: (value: string) => void; maxPrice: number; setMaxPrice: (value: number) => void; minRating: number; setMinRating: (value: number) => void }) {
  return <div className="space-y-8 rounded-2xl border border-line bg-panel p-5"><div><h3 className="text-sm font-bold text-white">Category</h3><div className="mt-4 space-y-2">{categoryOptions.map((option) => <label key={option} className="flex cursor-pointer items-center gap-3 text-sm text-slate-400"><input type="radio" name="category" checked={category === option} onChange={() => setCategory(option)} className="accent-blue-600" />{option}</label>)}</div></div><div><div className="flex justify-between"><h3 className="text-sm font-bold text-white">Maximum price</h3><span className="text-xs text-orange-400">₹{maxPrice.toLocaleString("en-IN")}</span></div><input type="range" min="25000" max="250000" step="5000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="mt-4 w-full accent-blue-600" /></div><div><h3 className="text-sm font-bold text-white">Minimum rating</h3><div className="mt-3 grid grid-cols-3 gap-2">{[0, 4.5, 4.8].map((rating) => <button key={rating} onClick={() => setMinRating(rating)} className={`rounded-lg border py-2 text-xs ${minRating === rating ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-line text-slate-500"}`}>{rating === 0 ? "Any" : `${rating}+ ★`}</button>)}</div></div></div>;
}
