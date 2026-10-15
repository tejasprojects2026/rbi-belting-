import { ArrowUpRight, MessageSquareText, Star, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviewPlatforms } from "@/lib/site-data";

export function JustdialReviews() {
  return (
    <section aria-labelledby="customer-reviews-title" className="mb-1 border-y border-border bg-white py-3 text-[#171717]">
      <div className="site-container">
        <h2 id="customer-reviews-title" className="sr-only">Customer reviews and business enquiries</h2>
        <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {reviewPlatforms.map((platform) => (
            <article key={platform.id} aria-labelledby={`reviews-${platform.id}-title`} className="flex min-w-0 flex-col items-center px-4 py-3 text-center lg:px-6">
              <p className="flex h-7 items-center text-xl font-black leading-7" aria-label={platform.source}>
                {platform.id === "justdial" ? (
                  <><span className="text-[#0756a3]">Just</span><span className="text-[#ad4800]">dial</span></>
                ) : platform.id === "google" ? (
                  <><span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span></>
                ) : (
                  <><span className="text-[#24468e]">India</span><span className="text-[#bd2026]">MART</span></>
                )}
              </p>
              <h3 id={`reviews-${platform.id}-title`} className="mt-1 text-lg font-black leading-6">{platform.title}</h3>
              <p className="mt-1 max-w-xs flex-1 text-sm leading-5 text-[#525252]">{platform.description}</p>
              <div className="flex h-14 w-full shrink-0 items-center justify-center">
                {platform.id === "justdial" ? (
                  <Star className="size-8 text-[#ad4800]" aria-hidden="true" />
                ) : platform.id === "google" ? (
                  <MessageSquareText className="size-8 text-[#4285f4]" aria-hidden="true" />
                ) : (
                  <Store className="size-8 text-[#24468e]" aria-hidden="true" />
                )}
              </div>
              <Button asChild className={`h-auto min-h-10 max-w-full whitespace-normal rounded-sm px-3 py-2 text-sm font-bold text-white ${platform.id === "indiamart" ? "bg-[#24468e] hover:bg-[#1b3570]" : "bg-[#0867bd] hover:bg-[#0756a3]"}`}>
                <a href={platform.listingUrl} aria-label={platform.linkAccessibleLabel} target="_blank" rel="noopener noreferrer">
                  {platform.linkLabel}<ArrowUpRight className="shrink-0" />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
