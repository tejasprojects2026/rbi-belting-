import { Gauge, MessageSquareText, Ruler, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/product-gallery";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import classicalImg from "@/assets/v-belts/classical-clean.jpg";
import coggedImg from "@/assets/v-belts/cogged-clean.jpg";
import bandedImg from "@/assets/v-belts/banded-clean.jpg";
import narrowImg from "@/assets/v-belts/narrow-clean.jpg";

const slides = [
  { image: classicalImg, title: "Classical wrapped belts", note: "General-purpose drive profiles for dependable plant maintenance." },
  { image: coggedImg, title: "Raw-edge cogged belts", note: "Flexible profiles designed for compact drives and improved heat dissipation." },
  { image: bandedImg, title: "Banded drive systems", note: "Joined-belt construction for demanding, shock-loaded applications." },
  { image: narrowImg, title: "Narrow and variable-speed profiles", note: "Compact section options for high-power and adjustable-speed drives." },
];

const specifications: Record<string, { models: string; sizes: string; construction: string; duty: string }> = {
  "Classical V-Belts": { models: "Z, A, B, C, D, E", sizes: "Section dependent; matched sets available", construction: "Wrapped rubber with tensile cord", duty: "General industrial drives" },
  "Narrow V-Belts": { models: "SPZ, SPA, SPB, SPC", sizes: "Metric datum lengths; matched sets available", construction: "High-power wedge profile", duty: "Compact, high-load drives" },
  "Micro V-Belts": { models: "PJ, PK, PL, PM", sizes: "Multi-rib profiles by pitch and rib count", construction: "Longitudinal ribbed belt", duty: "Precision and auxiliary drives" },
  "Banded V-Belts": { models: "Banded classical and wedge profiles", sizes: "By section, top width and band count", construction: "Multiple belts joined by a tie band", duty: "Shock load and vibration control" },
  "Variable Speed Belts": { models: "Wide-angle and cogged profiles", sizes: "By top width, height and effective length", construction: "Flexible raw-edge construction", duty: "Variable-pitch pulley systems" },
  "Link/Nutlink V-Belts": { models: "Adjustable link profiles", sizes: "Supplied by length and section", construction: "Interlocking composite links", duty: "Fast replacement and difficult access" },
  "Cogged V-Belts": { models: "AX, BX, CX and narrow cogged profiles", sizes: "Section dependent; matched sets available", construction: "Raw-edge belt with moulded cogs", duty: "High-speed and high-temperature drives" },
};

export function VBeltsShowcase({ product, open, onOpenChange, onEnquire }: { product: string; open: boolean; onOpenChange: (open: boolean) => void; onEnquire: (product: string) => void }) {
  const specs = specifications[product] ?? specifications["Classical V-Belts"];

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[94vh] gap-0 overflow-y-auto p-0 sm:max-w-5xl">
      <div className="grid lg:grid-cols-[1.18fr_.82fr]">
        <div className="self-start">
          <ProductGallery key={product} photos={slides} active={open} />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <DialogHeader>
            <p className="eyebrow">V-Belt range</p>
            <DialogTitle className="mt-2 text-3xl font-black leading-tight">{product}</DialogTitle>
            <DialogDescription className="pt-2 leading-6">Selection depends on pulley geometry, transmitted power, speed and operating conditions.</DialogDescription>
          </DialogHeader>
          <dl className="mt-7 divide-y divide-border border-y border-border">
            {[[Settings2,"Models / profiles",specs.models],[Ruler,"Size range",specs.sizes],[Gauge,"Construction",specs.construction],[Settings2,"Typical duty",specs.duty]].map(([Icon,label,value]) => {
              const SpecIcon = Icon as typeof Settings2;
              return <div key={String(label)} className="grid grid-cols-[24px_1fr] gap-3 py-4"><SpecIcon className="mt-0.5 size-4 text-primary"/><div><dt className="text-xs font-black uppercase text-muted-foreground">{String(label)}</dt><dd className="mt-1 text-sm font-semibold leading-6">{String(value)}</dd></div></div>;
            })}
          </dl>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">Share the existing belt marking, pulley dimensions, quantity and application for an exact match. Final availability and specification are confirmed against the selected brand.</p>
          <Button size="lg" className="mt-7 h-12 w-full" onClick={() => { onOpenChange(false); onEnquire(product); }}><MessageSquareText />Enquire now</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}
