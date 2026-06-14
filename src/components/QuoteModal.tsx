import { useState, type FormEvent } from "react";
import { FileUp, Send } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { Button, Input, Modal, Textarea } from "./ui";

export function QuoteModal() {
  const { quoteOpen, quoteProduct, closeQuote, submitQuote } = useStore();
  const [fileName, setFileName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submitQuote({
      product: quoteProduct?.name,
      name: String(data.get("name")),
      company: String(data.get("company")),
      phone: String(data.get("phone")),
      email: String(data.get("email")),
      requirements: `${String(data.get("requirements"))}${fileName ? ` | Attachment: ${fileName}` : ""}`,
    });
    event.currentTarget.reset();
    setFileName("");
  }

  return (
    <Modal open={quoteOpen} onClose={closeQuote} title="Request a custom quote">
      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        {quoteProduct && <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-300">Quote for <strong className="text-white">{quoteProduct.name}</strong></div>}
        <div className="grid gap-4 sm:grid-cols-2"><Input name="name" placeholder="Full name" required /><Input name="company" placeholder="Company name" required /></div>
        <div className="grid gap-4 sm:grid-cols-2"><Input name="phone" type="tel" placeholder="Phone number" required /><Input name="email" type="email" placeholder="Work email" required /></div>
        <Textarea name="requirements" placeholder="Capacity, input range, application, quantity and delivery location" required />
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-600 bg-slate-950/50 px-4 py-3 text-sm text-slate-400 hover:border-blue-500">
          <span className="flex items-center gap-2"><FileUp className="h-4 w-4" />{fileName || "Attach requirement document"}</span>
          <input type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} />
        </label>
        <p className="text-xs leading-5 text-slate-500">A power systems specialist will review your requirement and respond within one business day.</p>
        <Button type="submit" className="w-full"><Send className="h-4 w-4" />Submit requirement</Button>
      </form>
    </Modal>
  );
}
