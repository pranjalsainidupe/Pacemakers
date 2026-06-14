import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Award, Box, Building2, ChevronDown, CircleCheck, Factory, Gauge,
  GraduationCap, Headphones, HeartPulse, Instagram, MapPin, MessageCircle, Phone,
  Quote, Server, ShieldCheck, Star, Truck, Waves, Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";
import { Badge, Button, Card, Reveal, SectionHeading } from "../components/ui";

const categories = [
  { name: "Servo Stabilizers", count: 24, icon: Zap, tone: "text-blue-400 bg-blue-500/10" },
  { name: "Control Panels", count: 18, icon: Box, tone: "text-blue-400 bg-blue-500/10" },
  { name: "Isolation Transformers", count: 14, icon: Waves, tone: "text-emerald-400 bg-emerald-500/10" },
  { name: "APFC Panels", count: 12, icon: Gauge, tone: "text-orange-400 bg-orange-500/10" },
  { name: "Inverters & UPS", count: 20, icon: Server, tone: "text-violet-400 bg-violet-500/10" },
  { name: "Industrial Automation", count: 16, icon: Factory, tone: "text-cyan-400 bg-cyan-500/10" },
];

const faqs = [
  ["How do I choose the right stabilizer capacity?", "Add the running load of connected equipment, account for motor starting current, then keep a 20–25% engineering margin. Our application team validates every selection before dispatch."],
  ["Can PaceMaker build panels to our drawings?", "Yes. We manufacture MCC, PCC, APFC, PLC and custom distribution panels against approved single-line diagrams, BOMs and site requirements."],
  ["Do you provide installation and commissioning?", "Yes. Pan-India installation, commissioning, preventive maintenance and AMC support are available through our service network."],
  ["What information is needed for a quotation?", "Share load in kW/KVA, input voltage range, phase, application, quantity and delivery city. For panels, attach the SLD and preferred component makes."],
];

export default function Home() {
  const { data: products = [] } = useProducts();
  const { openQuote } = useStore();
  return (
    <>
      <section className="relative overflow-hidden border-b border-line industrial-grid">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,.16),transparent_35%),linear-gradient(180deg,rgba(3,7,18,.2),#030712)]" />
        <div className="page-shell relative grid min-h-[570px] items-center gap-12 py-16 lg:grid-cols-[1.5fr_.8fr] lg:py-20">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
            <Badge className="mb-7"><ShieldCheck className="mr-2 h-4 w-4" />ISO 9001:2015 Certified Manufacturer</Badge>
            <h1 className="max-w-4xl text-[2.3rem] font-extrabold leading-[1.07] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Powering Industries With <span className="text-gradient">Reliable Electrical</span> Solutions
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">Advanced stabilizers, control panels and power systems built for performance. Trusted by 1000+ industries across India.</p>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:flex">
              <Link to="/products"><Button size="lg" className="w-full sm:w-auto"><Zap className="h-5 w-5" fill="currentColor" />Explore <span className="hidden sm:inline">Products</span></Button></Link>
              <Button size="lg" variant="outline" onClick={() => openQuote()} className="w-full sm:w-auto">Get Quote<ArrowRight className="h-5 w-5" /></Button>
            </div>
          </motion.div>
          <PowerMonitor />
        </div>
      </section>

      <section className="border-b border-line bg-panel/70"><div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">{[["5000+", "Installations"], ["1000+", "Happy Clients"], ["99.9%", "Reliability"], ["15+", "Years Experience"]].map(([value, label]) => <div key={label} className="border-b border-r border-line px-4 py-6 text-center last:border-r-0 lg:border-b-0"><p className="text-2xl font-extrabold text-blue-500 sm:text-3xl">{value}</p><p className="mt-1 text-xs tracking-wide text-slate-500 sm:text-sm">{label}</p></div>)}</div></section>

      <section className="section-pad border-b border-line"><div className="page-shell"><Reveal><SectionHeading title="Product Categories" description="Industrial-grade solutions engineered around your load profile and operating conditions." /></Reveal><div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">{categories.map((category, index) => <Reveal key={category.name} delay={index * .04}><Link to={`/products?q=${encodeURIComponent(category.name)}`} className="group block h-full rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:border-blue-500/50"><span className={`grid h-12 w-12 place-items-center rounded-xl ${category.tone}`}><category.icon className="h-6 w-6" /></span><h3 className="mt-5 text-sm font-bold leading-tight text-white sm:text-base">{category.name}</h3><p className="mt-1 text-xs text-slate-500">{category.count} Products</p></Link></Reveal>)}</div></div></section>

      <section className="section-pad border-b border-line bg-[#050a15]"><div className="page-shell"><div className="flex items-end justify-between gap-4"><SectionHeading title="Featured Products" description="Best-selling equipment, ready to ship or configure for your site." /><Link to="/products" className="hidden items-center gap-2 text-sm font-semibold text-blue-400 sm:flex">View all <ArrowRight className="h-4 w-4" /></Link></div><div className="scrollbar-none -mx-4 mt-9 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">{products.filter((product) => product.featured).slice(0, 6).map((product) => <div key={product.id} className="min-w-[82vw] snap-center sm:min-w-0"><ProductCard product={product} /></div>)}</div></div></section>

      <section className="section-pad border-b border-line"><div className="page-shell"><SectionHeading title="Why Choose PaceMaker?" description="One accountable engineering partner from application study to lifetime service." /><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
        [Award, "Quality Manufacturing", "ISO-certified processes with rigorous stage inspection and final testing."],
        [Truck, "Fast Delivery", "Planned production and a pan-India logistics network for dependable schedules."],
        [Headphones, "Expert Support", "Application engineers and 24/7 technical assistance for critical systems."],
        [MapPin, "Nationwide Service", "Installation and field service coverage across 25+ major industrial cities."],
      ].map(([Icon, title, text], index) => <Reveal key={String(title)} delay={index * .06}><Card className="h-full p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-500/10 text-orange-500"><Icon className="h-6 w-6" /></span><h3 className="mt-5 font-bold text-white">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{String(text)}</p></Card></Reveal>)}</div></div></section>

      <Industries />
      <CaseStudies />
      <Reviews />
      <SocialProof />
      <FaqSection />
      <ContactCta />
    </>
  );
}

function PowerMonitor() {
  return (
    <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .6 }} className="rounded-2xl border border-blue-500/50 bg-[#0b162b]/95 p-5 shadow-glow lg:p-6">
      <div className="flex items-center justify-between"><p className="text-sm font-bold text-blue-400">Live Power Monitor</p><span className="flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[11px] font-bold text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />LIVE</span></div>
      <div className="mt-4 hidden space-y-4 sm:block">
        <MonitorBar label="Input Voltage" value="415V AC" width="82%" color="bg-blue-500" />
        <MonitorBar label="Output Voltage" value="415V ✓" width="100%" color="bg-emerald-500" />
        <MonitorBar label="Load Current" value="87A" width="65%" color="bg-orange-500" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-2">
        <Metric value="415V" label="Input" color="text-blue-500" mobileOnly />
        <Metric value="415V" label="Output" color="text-emerald-400" mobileOnly />
        <Metric value="99.9%" label="Stable" color="text-orange-500" />
        <Metric value="0.3ms" label="Response" color="text-white" desktopOnly />
      </div>
    </motion.div>
  );
}

function MonitorBar({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return <div><div className="flex justify-between text-xs"><span className="text-slate-500">{label}</span><strong className="text-slate-200">{value}</strong></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><motion.div initial={{ width: 0 }} animate={{ width }} transition={{ delay: .7, duration: 1 }} className={`h-full rounded-full ${color}`} /></div></div>;
}

function Metric({ value, label, color, mobileOnly, desktopOnly }: { value: string; label: string; color: string; mobileOnly?: boolean; desktopOnly?: boolean }) {
  return <div className={`${mobileOnly ? "sm:hidden" : ""} ${desktopOnly ? "hidden sm:block" : ""} rounded-lg border border-line bg-slate-950/70 p-3 text-center`}><strong className={`text-lg ${color}`}>{value}</strong><p className="text-[11px] text-slate-600">{label}</p></div>;
}

function Industries() {
  const items = [[Factory, "Manufacturing", "Stable power for CNCs, process lines and automation."], [HeartPulse, "Hospitals", "Clean, protected supply for diagnostics and critical care."], [Building2, "Commercial", "Efficient distribution for high-rise and retail facilities."], [Server, "Data Centers", "High-availability conditioning for mission-critical loads."], [GraduationCap, "Education", "Reliable campus power with efficient lifecycle costs."]];
  return <section className="section-pad border-b border-line bg-[#050a15]"><div className="page-shell"><SectionHeading eyebrow="Applications" title="Engineered for critical industries" description="Power quality architectures designed around uptime, safety and operating economics." /><div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{items.map(([Icon, title, text]) => <Card key={String(title)} className="p-5"><Icon className="h-7 w-7 text-blue-400" /><h3 className="mt-5 font-bold text-white">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{String(text)}</p></Card>)}</div></div></section>;
}

function CaseStudies() {
  return <section className="section-pad border-b border-line"><div className="page-shell"><div className="flex items-end justify-between"><SectionHeading eyebrow="Field Results" title="Power problems, solved" description="Measured outcomes from real industrial deployments." /><Link to="/case-studies" className="hidden text-sm font-semibold text-blue-400 sm:block">Explore case studies →</Link></div><div className="mt-9 grid gap-4 lg:grid-cols-3">{[
    ["Textile Manufacturing", "Voltage fluctuation eliminated across 86 looms", "18%", "drop in electrical downtime"],
    ["Multi-speciality Hospital", "Clean power architecture for radiology equipment", "99.99%", "critical equipment uptime"],
    ["Automotive Components", "APFC upgrade recovered recurring demand penalties", "11 mo", "project payback period"],
  ].map(([industry, title, metric, result]) => <Card key={title} className="group overflow-hidden"><div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent" /><div className="p-6"><p className="text-xs font-bold uppercase tracking-widest text-blue-400">{industry}</p><h3 className="mt-4 text-xl font-bold leading-snug text-white">{title}</h3><div className="mt-8 border-t border-line pt-5"><strong className="text-3xl text-orange-500">{metric}</strong><p className="mt-1 text-sm text-slate-500">{result}</p></div></div></Card>)}</div></div></section>;
}

function Reviews() {
  return <section className="section-pad border-b border-line bg-[#050a15]"><div className="page-shell"><SectionHeading title="Trusted on the plant floor" description="What operations and engineering leaders say after deployment." /><div className="mt-9 grid gap-4 lg:grid-cols-3">{[
    ["PaceMaker's stabilizers have been running our plant for three years without failure. Exceptional quality and responsive service.", "Rajesh Sharma", "Plant Manager, ABC Textiles", "RS"],
    ["The team understood our SLD, improved the panel design and delivered ahead of shutdown. Commissioning was flawless.", "Neha Kulkarni", "Projects Head, Orion Foods", "NK"],
    ["Our imaging systems now receive consistently clean power. Their service team remains available whenever our facility needs support.", "Dr. Amit Mehra", "Director, NovaCare Hospitals", "AM"],
  ].map(([review, name, role, initials]) => <Card key={name} className="p-6"><Quote className="h-7 w-7 text-blue-500" /><p className="mt-5 text-sm leading-7 text-slate-300">“{review}”</p><div className="mt-6 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-blue-500/15 font-bold text-blue-400">{initials}</span><div><p className="text-sm font-bold text-white">{name}</p><p className="text-xs text-slate-500">{role}</p></div></div></Card>)}</div></div></section>;
}

function SocialProof() {
  return <section className="section-pad border-b border-line"><div className="page-shell grid gap-8 lg:grid-cols-2"><Card className="p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-white">Google Customer Reviews</p><div className="mt-3 flex items-center gap-3"><strong className="text-4xl text-white">4.9</strong><span><span className="flex text-amber-400">{[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}</span><span className="mt-1 block text-xs text-slate-500">Based on 286 verified reviews</span></span></div></div><CircleCheck className="h-10 w-10 text-blue-500" /></div><div className="mt-7 grid grid-cols-3 gap-3">{[["5.0", "Quality"], ["4.9", "Delivery"], ["4.8", "Support"]].map(([value, label]) => <div key={label} className="rounded-xl bg-slate-950/50 p-3 text-center"><strong className="text-white">{value}</strong><p className="text-xs text-slate-600">{label}</p></div>)}</div></Card><Card className="overflow-hidden"><div className="flex items-center justify-between p-6"><div><p className="font-bold text-white">From the factory floor</p><p className="mt-1 text-xs text-slate-500">@pacemakerelectricals</p></div><Instagram className="h-7 w-7 text-pink-400" /></div><div className="grid grid-cols-3">{["from-blue-950 to-blue-600/30", "from-orange-950 to-orange-600/30", "from-emerald-950 to-emerald-600/30"].map((tone, i) => <div key={tone} className={`aspect-square bg-gradient-to-br ${tone} grid place-items-center`}><span className="rounded-full border border-white/20 bg-black/20 p-3"><Zap className="h-6 w-6 text-white/80" fill={i === 0 ? "currentColor" : "none"} /></span></div>)}</div></Card></div></section>;
}

function FaqSection() {
  const [active, setActive] = useState(0);
  return <section className="section-pad border-b border-line bg-[#050a15]"><div className="page-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="FAQ" title="Answers from our engineers" description="Practical guidance for planning your power quality project." /><div className="divide-y divide-line rounded-2xl border border-line bg-panel">{faqs.map(([question, answer], index) => <div key={question}><button onClick={() => setActive(active === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-white">{question}<ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition ${active === index ? "rotate-180" : ""}`} /></button>{active === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5 text-sm leading-6 text-slate-400">{answer}</motion.p>}</div>)}</div></div></section>;
}

function ContactCta() {
  const { openQuote } = useStore();
  return <section className="section-pad"><div className="page-shell"><div className="relative overflow-hidden rounded-3xl border border-blue-500/40 bg-[#09152a] px-5 py-12 text-center shadow-glow sm:px-10"><div className="absolute inset-0 industrial-grid opacity-30" /><div className="relative"><h2 className="text-2xl font-extrabold text-white sm:text-4xl">Ready to power your industry?</h2><p className="mt-3 text-sm text-slate-400 sm:text-base">Get a free engineering consultation and a custom quote for your application.</p><div className="mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-3"><a href="tel:+919876543210"><Button size="lg" variant="outline" className="w-full"><Phone className="h-5 w-5" />Call Now</Button></a><Button size="lg" onClick={() => openQuote()} className="w-full">Request Quote</Button><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><Button size="lg" variant="success" className="w-full"><MessageCircle className="h-5 w-5" />WhatsApp</Button></a></div></div></div></div></section>;
}
