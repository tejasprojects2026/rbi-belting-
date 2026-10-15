import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { industries, industryCoverage } from "@/lib/site-data";
import { SectionHeading } from "@/components/page-sections";
import factory from "@/assets/factory-hero.jpg";
import automation from "@/assets/automation.jpg";
import belting from "@/assets/power-transmission.jpg";

const photos = {
  factory: { src: factory, alt: "Industrial production floor with CNC machines and component assembly lines" },
  automation: { src: automation, alt: "Automated production equipment with linear motion and conveyor systems" },
  belting: { src: belting, alt: "Industrial drive belts and pulleys installed on production machinery" },
};

export function IndustryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndustry = industries[activeIndex] ?? industries[0];
  const photo = photos[activeIndustry.image];

  return (
    <section id="industry-coverage" aria-label={industryCoverage.eyebrow} className="pb-20 pt-6">
      <div className="site-container">
        <SectionHeading eyebrow={industryCoverage.eyebrow} title={industryCoverage.title} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <div className="min-w-0">
            <p className="mb-3 text-sm leading-6 text-muted-foreground">{industryCoverage.instruction}</p>
            <div role="group" aria-label="Choose an industry" className="border-y border-border">
              {industries.map((industry, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={industry.name}
                    type="button"
                    aria-pressed={active}
                    aria-controls="industry-preview"
                    onClick={() => setActiveIndex(index)}
                    className={`flex min-h-12 w-full items-center gap-3 border-b border-l-4 px-3 py-3 text-left text-sm transition-colors last:border-b-0 focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-base ${active ? "border-l-primary bg-primary/5 font-bold text-primary" : "border-l-transparent font-semibold text-foreground hover:bg-muted hover:text-primary"}`}
                  >
                    <span className={`shrink-0 text-xs tabular-nums ${active ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">{industry.name}</span>
                    <ArrowUpRight className={`size-4 shrink-0 ${active ? "opacity-100" : "opacity-35"}`} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
          <figure id="industry-preview" aria-labelledby="industry-preview-title" className="relative min-h-[380px] min-w-0 overflow-hidden bg-foreground text-background sm:min-h-[420px] lg:min-h-0">
            <img src={photo.src} alt={photo.alt} width={1408} height={912} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
            <figcaption aria-live="polite" aria-atomic="true" className="relative flex h-full min-h-[380px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-8 lg:min-h-0">
              <span className="mb-4 h-1 w-12 bg-primary-soft" aria-hidden="true" />
              <h3 id="industry-preview-title" className="text-2xl font-black leading-tight sm:text-3xl">{activeIndustry.name}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-background/85 sm:text-base sm:leading-7">{activeIndustry.description}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
