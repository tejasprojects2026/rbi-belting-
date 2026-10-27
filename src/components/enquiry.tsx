import { validateBrochurePhone, validateBrochureEmail } from "@/lib/brochure-validation";
import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formContent } from "@/lib/site-data";

export type EnquirySeed = { requirement?: string; category?: string };
export const WA_PHONE = "918788195839";
export const EMAIL = "response@rbibelting.in";

const clean = (value: string, max = 1000) => value.trim().slice(0, max);

type EnquiryDetails = {
  name: string;
  company: string;
  phone: string;
  email: string;
  category: string;
  requirement: string;
};

export function buildMessage(details: EnquiryDetails) {
  return `Website enquiry\nName: ${clean(details.name, 100)}\nCompany: ${clean(details.company, 120)}\nPhone: ${clean(details.phone, 20)}\nEmail: ${clean(details.email, 200)}\nCategory: ${clean(details.category, 80)}\nRequirement: ${clean(details.requirement)}`;
}

export function EnquiryForm({ seed = {}, compact = false, hideWhatsApp = false, submitLabel = "Submit your inquiry", variant = "product" }: { seed?: EnquirySeed; compact?: boolean; hideWhatsApp?: boolean; submitLabel?: string; variant?: "product" | "general" }) {
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();

  const send = (kind: "email" | "wa", form: HTMLFormElement) => {
    const formData = new FormData(form);
    const details = {
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      category: String(formData.get("category") || seed.category || "Others"),
      requirement: String(formData.get("requirement") || seed.requirement || ""),
    };
    if (!clean(details.name) || !clean(details.phone) || !clean(details.requirement)) {
      setError("Please add your name, phone number and requirement.");
      return;
    }
    const invalidPhone = validateBrochurePhone(details.phone);
    setPhoneError(invalidPhone);
    if (invalidPhone) { form.querySelector<HTMLInputElement>('[name="phone"]')?.focus(); return; }
    if (details.email.trim()) {
      const invalidEmail = validateBrochureEmail(details.email);
      if (invalidEmail) { setError(invalidEmail); return; }
    }
    setError("");
    const message = buildMessage(details);
    window.location.href = kind === "email"
      ? `mailto:${EMAIL}?subject=${encodeURIComponent(`${variant === "general" ? formContent.generalTitle : "Product enquiry"}: ${details.category}`)}&body=${encodeURIComponent(message)}`
      : `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label htmlFor="eq-name">Name *</Label><Input id="eq-name" name="name" required maxLength={100} className="mt-1 h-12" /></div>
        <div><Label htmlFor="eq-company">Company</Label><Input id="eq-company" name="company" maxLength={120} className="mt-1 h-12" /></div>
        <div><Label htmlFor="eq-phone">Phone *</Label><Input id="eq-phone" name="phone" aria-invalid={!!phoneError} aria-describedby="eq-phone-error" onChange={event=>setPhoneError(validateBrochurePhone(event.currentTarget.value))} onBlur={event=>setPhoneError(validateBrochurePhone(event.currentTarget.value))} type="tel" required maxLength={20} className="mt-1 h-12" /><p id="eq-phone-error" role="alert" className="mt-1 text-sm text-destructive">{phoneError}</p></div>
        <div><Label htmlFor="eq-email">Email</Label><Input id="eq-email" name="email" type="email" maxLength={200} className="mt-1 h-12" /></div>
      </div>
      <div>
        <Label htmlFor="eq-category">Category</Label>
        <select id="eq-category" name="category" defaultValue={seed.category || "Others"} className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3">
          <option>Power Transmission</option><option>Automation</option><option>Adhesives</option><option>Franchise</option>{variant === "general" && <option>{formContent.careersCategory}</option>}<option>Others</option>
        </select>
      </div>
      <div><Label htmlFor="eq-requirement">Describe what you need *</Label><Textarea id="eq-requirement" name="requirement" required maxLength={1000} defaultValue={seed.requirement} rows={compact ? 3 : 5} className="mt-1" placeholder={variant === "general" ? undefined : formContent.requirementPlaceholder} /></div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      <p className="text-xs leading-5 text-muted-foreground">{formContent.contactDisclaimer}</p>
      <div className={`grid gap-3 ${hideWhatsApp ? "" : "sm:grid-cols-2"}`}>
        <Button type="button" size="lg" className="h-12" onClick={(event) => { const form = event.currentTarget.form; if (form) send("email", form); }}><Mail />{submitLabel}</Button>
        {!hideWhatsApp && <Button type="button" size="lg" variant="outline" className="h-12 border-whatsapp text-whatsapp hover:bg-whatsapp-soft" onClick={(event) => { const form = event.currentTarget.form; if (form) send("wa", form); }}><MessageCircle />Send on WhatsApp</Button>}
      </div>
    </form>
  );
}

export function EnquiryDialog({ open, onOpenChange, seed }: { open: boolean; onOpenChange: (value: boolean) => void; seed: EnquirySeed }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl"><DialogHeader><DialogTitle className="text-2xl">Send your requirement</DialogTitle><DialogDescription>Tell us the part, size, brand or application. Our team will help identify the right product.</DialogDescription></DialogHeader><EnquiryForm seed={seed} compact /></DialogContent></Dialog>;
}
