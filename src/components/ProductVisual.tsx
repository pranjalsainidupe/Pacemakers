import { BatteryCharging, Box, Gauge, Settings, Waves, Zap } from "lucide-react";
import type { Product } from "../types";
import { cn } from "../lib/utils";

const toneStyles = {
  blue: "from-blue-500/20 via-blue-500/10 to-slate-900 text-blue-400",
  orange: "from-orange-500/20 via-orange-500/10 to-slate-900 text-orange-500",
  green: "from-emerald-500/20 via-emerald-500/10 to-slate-900 text-emerald-400",
  violet: "from-violet-500/20 via-violet-500/10 to-slate-900 text-violet-400",
  cyan: "from-cyan-500/20 via-cyan-500/10 to-slate-900 text-cyan-400",
};

const icons = {
  zap: Zap,
  box: Box,
  wave: Waves,
  gauge: Gauge,
  battery: BatteryCharging,
  settings: Settings,
};

export function ProductVisual({ product, compact = false, className }: { product: Product; compact?: boolean; className?: string }) {
  const Icon = icons[product.icon];
  return (
    <div className={cn("relative grid place-items-center overflow-hidden bg-gradient-to-br", toneStyles[product.tone], compact ? "h-32" : "h-44 sm:h-48", className)}>
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(59,130,246,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.22)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute h-24 w-24 rounded-full bg-current opacity-[0.07] blur-2xl" />
      <Icon className={cn("relative", compact ? "h-10 w-10" : "h-14 w-14")} strokeWidth={1.8} />
    </div>
  );
}
