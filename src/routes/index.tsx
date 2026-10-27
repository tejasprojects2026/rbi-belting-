import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Factory,
  Handshake,
  MessageSquareText,
  PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandStrip, PillarCards, SectionHeading } from "@/components/page-sections";
import { EnquiryDialog } from "@/components/enquiry";
import { DealerRelationships } from "@/components/dealer-relationships";
import { IndustryShowcase } from "@/components/industry-showcase";
import { allBrands, brandPartnersContent, logoBrands, serviceBenefits, upcomingRange } from "@/lib/site-data";
import { pageHead } from "@/lib/seo";
import hero from "@/assets/factory-hero.jpg";

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RB International Belting & Automation",
  url: "https://rbibelting.com",
  telephone: "+91 87881 95839",
  email: "response@rbibelting.in",
  foundingDate: "2003",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate",
    addressLocality: "Pune",
    postalCode: "411026",
    addressCountry: "IN",
  },
};

const stats = [
  ["20+", "Years in industry"],
  ["500+", "Active clients"],
  ["50+", "Brand partnerships"],
  ["PAN India", "+ Export service"],
];

const brandThemes = [
  "border-primary/25 bg-primary/10 text-primary",
  "border-foreground/10 bg-muted text-foreground",
  "border-category/25 bg-background text-primary",
];

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Industrial Belts, Automation & Adhesives | RB International Pune",
      "RB International supplies power transmission belts, automation components and industrial adhesives from Pune to 500+ manufacturers across India and export markets.",
      "/",
      org,
    ),
  component: Home,
});

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="home-hero">
        <img
          src={hero}
          alt="Modern Indian factory floor with CNC machinery and production lines"
          width={1600}
          height={912}
          fetchPriority="high"
        />
        <div className="absolute inset-0 hidden bg-foreground/75 md:block" />
        <div className="site-container relative flex items-start py-8 text-background md:min-h-[calc(100svh-5rem-1px)] md:items-center md:py-10">
          <div className="w-full max-w-6xl">
            <div className="max-w-5xl">
              <p className="eyebrow text-primary-soft">Powering industry since 2003</p>
              <h1 className="mt-5 text-4xl font-black leading-[1.08] md:text-[clamp(2rem,4vw,3.5rem)]">
                <span className="md:block md:whitespace-nowrap">India's trusted partner in</span>{" "}
                <span className="md:block md:whitespace-nowrap">power transmission,</span>{" "}
                <span className="md:block md:whitespace-nowrap">automation &amp; industrial adhesives</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-background/80">
                Supplying critical belts, automation components and MRO adhesives from Pune to manufacturers across India and export markets.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12">
                  <a href="#divisions">
                    Explore our range <ArrowRight />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-background/40 bg-background/10 text-background hover:bg-background hover:text-foreground"
                  onClick={() => setOpen(true)}
                >
                  <MessageSquareText />
                  Enquire Now
                </Button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 overflow-hidden border border-background/25 lg:grid-cols-4">
              {stats.map(([number, label]) => (
                <div
                  key={label}
                  className="border-b border-r border-background/25 px-3 py-5 text-center last:border-r-0 [&:nth-child(even)]:border-r-0 lg:border-b-0 lg:[&:nth-child(even)]:border-r lg:last:border-r-0"
                >
                  <strong className="block text-2xl font-black text-primary-soft md:text-3xl">{number}</strong>
                  <span className="mt-1 block text-xs font-bold uppercase text-background/75">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="divisions" className="pattern-shared pb-20 pt-10">
        <div className="site-container">
          <SectionHeading
            eyebrow="Complete industrial supply"
            title="Three divisions. One trusted source."
            text="Choose the product family you need or send the exact code, size or application directly to our team."
          />
          <PillarCards />
        </div>
      </section>

      <section className="bg-foreground py-16 text-background">
        <div className="site-container">
          <SectionHeading
            eyebrow={brandPartnersContent.eyebrow}
            title={brandPartnersContent.title}
          />
          <BrandStrip brands={logoBrands} />
          <section className="mt-12 md:mt-16" aria-label="Dealer relationships">
            <DealerRelationships />
          </section>
        </div>
      </section>

      <section className="pb-6 pt-20" aria-label={upcomingRange.title}>
        <div className="site-container grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <SectionHeading
              eyebrow={upcomingRange.eyebrow}
              title={upcomingRange.title}
              text={upcomingRange.description}
            />
            <div className="flex justify-center">
              <Button asChild>
                <a href={upcomingRange.href}>{upcomingRange.linkLabel}</a>
              </Button>
            </div>
          </div>
          <aside aria-labelledby="upcoming-range-details" className="min-w-0 border border-border border-t-4 border-t-primary bg-muted/60 p-6 shadow-sm sm:p-7">
            <h3 id="upcoming-range-details" className="text-2xl font-black leading-tight">{upcomingRange.detailsTitle}</h3>
            <div className="mt-5 space-y-5">
              {upcomingRange.focusAreas.map((item, index) => {
                const Icon = index === 0 ? Factory : PackageCheck;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="grid size-10 shrink-0 place-items-center border border-primary/15 bg-primary/5 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-black leading-6">{item.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <h4 className="text-sm font-black text-primary">{upcomingRange.interestTitle}</h4>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{upcomingRange.interestDescription}</p>
            </div>
          </aside>
        </div>
      </section>

      <IndustryShowcase />

      <section className="pattern-shared bg-muted py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="Why manufacturers call us"
            title={
              <>
                <span className="block whitespace-nowrap text-[1.05rem] leading-[1.08] min-[390px]:text-[1.25rem] sm:hidden">Fast answers. Genuine products.</span>
                <span className="block whitespace-nowrap text-[1.05rem] leading-[1.08] min-[390px]:text-[1.25rem] sm:hidden">Practical support.</span>
                <span className="hidden sm:inline">Fast answers. Genuine products. Practical support.</span>
              </>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceBenefits.map(({ title, description }, index) => {
              const Icon = [PackageCheck, MessageSquareText, Handshake][index] ?? Handshake;
              return (
              <article key={title} className="border-t-4 border-primary bg-background p-7">
                <Icon className="text-primary" />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <div className="site-container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black">Have a specific requirement?</h2>
            <p className="mt-2 text-primary-foreground/75">
              Send the brand, code, size or application. Our team aims to respond within 2 business hours.
            </p>
          </div>
          <Button size="lg" variant="secondary" onClick={() => setOpen(true)}>
            Submit enquiry
          </Button>
        </div>
      </section>

      {/* Temporarily hidden; remove the hidden attribute to restore the brand network. */}
      <section hidden className="pattern-shared py-16">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow">Brand network</p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">Brands associated with RBI Belting</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                A broad supply network for belts, motion control, adhesives, maintenance chemicals and industrial MRO requirements.
              </p>
              <Button variant="outline" className="mt-5" onClick={() => setOpen(true)}>
                <MessageSquareText />
                Ask for a brand
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
              {allBrands.map((brand, index) => (
                <div
                  key={brand}
                  className={`inline-flex min-h-10 items-center border px-3 py-1.5 text-xs font-black leading-tight shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:min-h-12 sm:px-4 sm:py-2 sm:text-sm ${brandThemes[index % brandThemes.length]}`}
                >
                  <span className="mr-3 text-xs font-black opacity-50">{String(index + 1).padStart(2, "0")}</span>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EnquiryDialog open={open} onOpenChange={setOpen} seed={{}} />
    </>
  );
}
