import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Download, Headphones, KeyRound, LifeBuoy, Lock, Mail, MapPin, Package, Save, TicketCheck, User, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Input, SectionHeading, Textarea } from "../components/ui";
import { useStore } from "../context/StoreContext";

function AuthShell({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return <div className="page-shell grid min-h-[720px] items-center py-16 lg:grid-cols-2"><div className="hidden pr-16 lg:block"><p className="text-xs font-bold uppercase tracking-[.25em] text-blue-400">PaceMaker Account</p><h1 className="mt-5 text-5xl font-extrabold leading-tight text-white">{title}</h1><p className="mt-5 max-w-lg text-lg leading-8 text-slate-400">{text}</p><div className="mt-10 grid grid-cols-2 gap-3">{[["Orders", "Track every dispatch"], ["Quotes", "Keep proposals organized"], ["Downloads", "Access invoices and manuals"], ["Support", "Get faster technical help"]].map(([label, sub]) => <Card key={label} className="p-4"><strong className="text-white">{label}</strong><p className="mt-1 text-xs text-slate-500">{sub}</p></Card>)}</div></div><div className="mx-auto w-full max-w-md"><Card className="p-6 sm:p-8">{children}</Card></div></div>;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { notify } = useStore();
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); notify("Welcome back to PaceMaker"); navigate("/profile"); }
  return <AuthShell title="Your equipment, orders and support in one place" text="Sign in to manage procurement, download invoices and keep every project conversation organized."><h2 className="text-2xl font-bold text-white">Sign in</h2><p className="mt-2 text-sm text-slate-500">Use your registered email or mobile number.</p><form onSubmit={submit} className="mt-6 space-y-4"><Input type="email" placeholder="Work email" required /><Input type="password" placeholder="Password" required /><div className="flex justify-end"><Link to="/forgot-password" className="text-xs font-semibold text-blue-400">Forgot password?</Link></div><Button type="submit" className="w-full"><Lock className="h-4 w-4" />Sign in</Button><Button type="button" variant="outline" className="w-full">Continue with Google</Button><Button type="button" variant="ghost" className="w-full">Sign in with OTP</Button></form><p className="mt-6 text-center text-sm text-slate-500">New to PaceMaker? <Link to="/register" className="font-semibold text-blue-400">Create an account</Link></p></AuthShell>;
}

export function RegisterPage() {
  const navigate = useNavigate(); const { notify } = useStore();
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); notify("Account created successfully"); navigate("/profile"); }
  return <AuthShell title="A simpler way to manage industrial procurement" text="Create a business account to save quotes, track orders and collaborate with our engineering team."><h2 className="text-2xl font-bold text-white">Create account</h2><form onSubmit={submit} className="mt-6 space-y-4"><div className="grid grid-cols-2 gap-3"><Input placeholder="First name" required /><Input placeholder="Last name" required /></div><Input placeholder="Company name" required /><Input type="email" placeholder="Work email" required /><Input type="tel" placeholder="Mobile number" required /><Input type="password" placeholder="Create password" minLength={8} required /><label className="flex items-start gap-3 text-xs leading-5 text-slate-500"><input type="checkbox" required className="mt-1 accent-blue-600" />I agree to the terms and consent to account-related communication.</label><Button type="submit" className="w-full"><UserPlus className="h-4 w-4" />Create business account</Button></form><p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-blue-400">Sign in</Link></p></AuthShell>;
}

export function ForgotPasswordPage() {
  const { notify } = useStore();
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); notify("Password reset instructions sent"); }
  return <AuthShell title="Secure access, restored quickly" text="We will send a time-limited reset link to your verified business email."><KeyRound className="h-10 w-10 text-blue-400" /><h2 className="mt-5 text-2xl font-bold text-white">Reset password</h2><p className="mt-2 text-sm leading-6 text-slate-500">Enter the email associated with your PaceMaker account.</p><form onSubmit={submit} className="mt-6 space-y-4"><Input type="email" placeholder="Work email" required /><Button type="submit" className="w-full"><Mail className="h-4 w-4" />Send reset link</Button></form><Link to="/login" className="mt-6 block text-center text-sm font-semibold text-blue-400">Return to sign in</Link></AuthShell>;
}

const accountNav = [[User, "Profile", "/profile"], [Package, "Orders", "/orders"], [TicketCheck, "Saved Quotes", "/quotes"], [LifeBuoy, "Support", "/support"]] as const;

function AccountLayout({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div className="page-shell section-pad"><SectionHeading title={title} description={description} /><div className="mt-9 grid gap-8 lg:grid-cols-[220px_1fr]"><aside><Card className="overflow-hidden">{accountNav.map(([Icon, label, path]) => <Link key={path} to={path} className="flex items-center gap-3 border-b border-line px-4 py-4 text-sm text-slate-400 last:border-0 hover:bg-slate-800 hover:text-white"><Icon className="h-4 w-4" />{label}</Link>)}</Card></aside>{children}</div></div>;
}

export function ProfilePage() {
  const { notify } = useStore(); function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); notify("Profile updated"); }
  return <AccountLayout title="Account profile" description="Manage your business identity, contact details and delivery preferences."><form onSubmit={submit} className="space-y-5"><Card className="p-6"><h2 className="font-bold text-white">Business details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Input defaultValue="Rajesh Sharma" /><Input defaultValue="ABC Textiles Pvt. Ltd." /><Input type="email" defaultValue="rajesh@abctextiles.in" /><Input type="tel" defaultValue="+91 98765 43210" /></div></Card><Card className="p-6"><h2 className="flex items-center gap-2 font-bold text-white"><MapPin className="h-4 w-4 text-blue-400" />Default address</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Input defaultValue="MIDC Industrial Area" className="sm:col-span-2" /><Input defaultValue="Pune" /><Input defaultValue="411019" /></div></Card><Button type="submit"><Save className="h-4 w-4" />Save changes</Button></form></AccountLayout>;
}

export function OrdersPage() {
  const orders = [["PM-260614", "Jun 14, 2026", "Servo Stabilizer 10KVA", "₹53,100", "Processing"], ["PM-260421", "Apr 21, 2026", "Isolation Transformer 25KVA", "₹37,760", "Delivered"], ["PM-251119", "Nov 19, 2025", "APFC Panel 100KVAR", "₹1,05,020", "Delivered"]];
  return <AccountLayout title="Orders" description="Track production, dispatch and delivery for every purchase."><Card className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="border-b border-line bg-slate-950/40 text-xs uppercase tracking-wider text-slate-600"><tr>{["Order", "Date", "Equipment", "Total", "Status", ""].map((h) => <th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{orders.map((order) => <tr key={order[0]} className="border-b border-line last:border-0"><td className="px-5 py-5 font-bold text-blue-400">{order[0]}</td><td className="px-5 text-slate-500">{order[1]}</td><td className="px-5 text-white">{order[2]}</td><td className="px-5 text-slate-300">{order[3]}</td><td className="px-5"><span className={`rounded-full px-2 py-1 text-xs ${order[4] === "Delivered" ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"}`}>{order[4]}</span></td><td className="px-5"><button className="text-blue-400"><Download className="h-4 w-4" /></button></td></tr>)}</tbody></table></Card></AccountLayout>;
}

export function QuotesPage() {
  const { quotes, openQuote } = useStore();
  const defaults = [{ id: "PMQ-102441", product: "MCC Control Panel 125A", company: "ABC Textiles Pvt. Ltd.", createdAt: "2026-06-10T10:00:00Z", name: "Rajesh", phone: "", email: "", requirements: "Custom 8-feeder panel" }];
  const all = quotes.length ? quotes : defaults;
  return <AccountLayout title="Saved quotes" description="Review active requests and continue conversations with our engineering team."><div><div className="space-y-4">{all.map((quote) => <Card key={quote.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold text-blue-400">{quote.id}</p><h2 className="mt-2 font-bold text-white">{quote.product || "Custom electrical requirement"}</h2><p className="mt-1 text-xs text-slate-500">Submitted {new Date(quote.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p></div><div className="flex items-center gap-3"><span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">Under review</span><Button variant="outline">View</Button></div></Card>)}</div><Button className="mt-5" onClick={() => openQuote()}>New quote request <ArrowRight className="h-4 w-4" /></Button></div></AccountLayout>;
}

export function SupportPage() {
  const { notify } = useStore(); function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); event.currentTarget.reset(); notify("Support ticket created: PMS-6214"); }
  return <AccountLayout title="Support desk" description="Get technical help for installed equipment and active projects."><div className="grid gap-5 xl:grid-cols-[1fr_300px]"><Card className="p-6"><h2 className="flex items-center gap-2 font-bold text-white"><Headphones className="h-5 w-5 text-blue-400" />Create support ticket</h2><form onSubmit={submit} className="mt-5 space-y-4"><Input placeholder="Equipment serial number" required /><select className="h-11 w-full rounded-xl border border-line bg-slate-950/70 px-4 text-sm text-slate-400"><option>Technical assistance</option><option>Installation support</option><option>Warranty service</option><option>Preventive maintenance</option></select><Textarea placeholder="Describe the issue, alarms and operating conditions" required /><Button type="submit">Submit ticket</Button></form></Card><div className="space-y-4"><Card className="p-5"><p className="text-xs text-slate-500">24/7 critical line</p><p className="mt-2 font-bold text-white">+91 98765 43210</p></Card><Card className="p-5"><p className="text-xs text-slate-500">Open ticket</p><p className="mt-2 font-bold text-white">PMS-5891</p><p className="mt-1 text-xs text-emerald-400">Engineer assigned</p></Card></div></div></AccountLayout>;
}
