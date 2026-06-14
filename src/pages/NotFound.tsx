import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";

export default function NotFound() {
  return <div className="page-shell grid min-h-[70vh] place-items-center py-20 text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-500/10 text-blue-400"><Zap className="h-8 w-8" /></span><p className="mt-8 text-sm font-bold uppercase tracking-[.3em] text-blue-400">404</p><h1 className="mt-4 text-4xl font-extrabold text-white sm:text-6xl">Circuit not found</h1><p className="mx-auto mt-4 max-w-md text-slate-500">The page you requested is unavailable or has moved to a different part of the PaceMaker network.</p><Link to="/"><Button className="mt-8"><ArrowLeft className="h-4 w-4" />Return home</Button></Link></div></div>;
}
