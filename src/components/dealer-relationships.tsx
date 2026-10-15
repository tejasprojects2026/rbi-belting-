import { Award } from "lucide-react";
import { SectionHeading } from "@/components/page-sections";
import { dealerRelationships } from "@/lib/site-data";

export function DealerRelationships() {
  return (
    <>
      <SectionHeading
        eyebrow={dealerRelationships.eyebrow}
        title={dealerRelationships.title}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dealerRelationships.brands.map((brand) => (
          <article key={brand} className="border border-background/20 p-5">
            <Award aria-hidden="true" />
            <div className="mt-5 grid h-40 place-items-center bg-background/5 px-2 text-center font-black">
              <p>
                {dealerRelationships.certificateLabel}
                <br />
                {brand}
              </p>
            </div>
            <p className="mt-4 text-xs text-background/60">
              {dealerRelationships.certificateNote}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
