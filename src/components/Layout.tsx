import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Heart, Menu, Search, ShoppingBag, User, X, Zap } from "lucide-react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Button, Input } from "./ui";
import { QuoteModal } from "./QuoteModal";

const navItems = [
  ["Products", "/products"],
  ["Solutions", "/solutions"],
  ["Industries", "/industries"],
  ["Case Studies", "/case-studies"],
  ["About", "/about"],
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-white">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-electric shadow-lg shadow-blue-950"><Zap className="h-5 w-5" fill="currentColor" /></span>
      PaceMaker
    </Link>
  );
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlist, openQuote, toast } = useStore();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    navigate(`/products?q=${encodeURIComponent(search)}`);
  }

  return (
    <div className="min-h-screen bg-ink text-slate-200">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`}>{label}</NavLink>)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <button onClick={() => setSearchOpen((value) => !value)} className="rounded-xl p-3 text-slate-400 hover:bg-slate-900 hover:text-white" aria-label="Search"><Search className="h-5 w-5" /></button>
            <Link to="/wishlist" className="relative rounded-xl p-3 text-slate-400 hover:bg-slate-900 hover:text-white" aria-label="Wishlist"><Heart className="h-5 w-5" />{wishlist.length > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-electric px-1 text-[10px] text-white">{wishlist.length}</span>}</Link>
            <Link to="/cart" className="relative rounded-xl p-3 text-slate-400 hover:bg-slate-900 hover:text-white" aria-label="Cart"><ShoppingBag className="h-5 w-5" />{cart.length > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ember px-1 text-[10px] text-white">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</Link>
            <Link to="/login"><Button variant="outline">Login</Button></Link>
            <Button onClick={() => openQuote()}>Request Quote</Button>
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <button onClick={() => setSearchOpen((value) => !value)} className="p-2 text-slate-400" aria-label="Search"><Search className="h-6 w-6" /></button>
            <button onClick={() => setMenuOpen((value) => !value)} className="p-2 text-slate-400" aria-label="Menu">{menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}</button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={submitSearch} className="overflow-hidden border-t border-line"><div className="mx-auto flex max-w-3xl gap-2 p-4"><Input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search stabilizers, panels, transformers…" /><Button type="submit">Search</Button></div></motion.form>}
          {menuOpen && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="border-t border-line bg-[#070d1a] p-4 lg:hidden">
            <nav className="grid gap-1">{navItems.map(([label, path]) => <Link key={path} to={path} className="flex items-center justify-between rounded-xl px-4 py-3 font-medium text-slate-300 hover:bg-slate-800">{label}<ChevronRight className="h-4 w-4" /></Link>)}</nav>
            <div className="mt-3 grid grid-cols-3 gap-2"><Link to="/wishlist"><Button variant="outline" className="w-full px-2"><Heart className="h-4 w-4" /></Button></Link><Link to="/cart"><Button variant="outline" className="w-full px-2"><ShoppingBag className="h-4 w-4" />{cart.length}</Button></Link><Link to="/login"><Button variant="outline" className="w-full px-2"><User className="h-4 w-4" /></Button></Link></div>
            <Button onClick={() => openQuote()} className="mt-2 w-full">Request Quote</Button>
          </motion.div>}
        </AnimatePresence>
      </header>
      <AnimatePresence mode="wait"><motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><Outlet /></motion.main></AnimatePresence>
      <Footer />
      <QuoteModal />
      <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="fixed bottom-5 left-1/2 z-[110] -translate-x-1/2 rounded-xl border border-blue-500/30 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl">{toast}</motion.div>}</AnimatePresence>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-[#020610]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div><Logo /><p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">Power quality systems engineered and manufactured in India for demanding industrial applications.</p><p className="mt-5 text-sm font-semibold text-slate-300">ISO 9001:2015 Certified</p></div>
        <FooterLinks title="Products" links={[["Servo Stabilizers", "/products?q=servo"], ["Control Panels", "/products?q=panel"], ["Transformers", "/products?q=transformer"], ["UPS Systems", "/products?q=ups"]]} />
        <FooterLinks title="Company" links={[["About", "/about"], ["Case Studies", "/case-studies"], ["Blog", "/blog"], ["Contact", "/contact"]]} />
        <FooterLinks title="Support" links={[["FAQ", "/faq"], ["Track Orders", "/orders"], ["Support Desk", "/support"], ["Admin Demo", "/admin"]]} />
      </div>
      <div className="border-t border-line"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-10"><p>© 2026 PaceMaker Electricals. All rights reserved.</p><div className="flex gap-5"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div></div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return <div><h3 className="font-bold text-white">{title}</h3><div className="mt-4 grid gap-3">{links.map(([label, path]) => <Link key={path} to={path} className="text-sm text-slate-500 hover:text-blue-400">{label}</Link>)}</div></div>;
}
