import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "success" | "orange";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        variant === "primary" && "bg-electric text-white hover:bg-blue-500 shadow-lg shadow-blue-950/30",
        variant === "outline" && "border border-slate-600 bg-slate-950/30 text-white hover:border-blue-400 hover:bg-blue-500/10",
        variant === "ghost" && "text-slate-300 hover:bg-slate-800 hover:text-white",
        variant === "success" && "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
        variant === "orange" && "bg-ember text-white hover:bg-orange-500",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-14 px-6 text-base sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border border-line bg-panel/80", className)}>{children}</div>;
}

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400", className)}>
      {children}
    </span>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn("h-11 w-full rounded-xl border border-line bg-slate-950/70 px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500", className)}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn("min-h-28 w-full resize-none rounded-xl border border-line bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500", className)}
      {...props}
    />
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-400">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">{description}</p>}
    </div>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl border border-blue-500/30 bg-[#081121] shadow-2xl shadow-blue-950/50">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Close dialog"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
