import { useEffect, useRef } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { mountReviews } from "@/lib/vendor/rb-reviews-carousel";
import { Button } from "@/components/ui/button";
import { customerReviews, reviewPlatforms } from "@/lib/site-data";

export function JustdialReviews() {
  return (
    <section
      aria-labelledby="customer-reviews-title"
      className="mb-1 border-y border-border bg-white py-3 text-[#171717]"
    >
      <div className="site-container">
        <h2 id="customer-reviews-title" className="sr-only">
          Customer reviews and business enquiries
        </h2>
        <div className="grid divide-y divide-border md:min-h-[276px] md:grid-cols-2 md:divide-x md:divide-y-0">
          <GoogleReviewsCarousel />
          <div className="grid min-h-0 grid-rows-2 divide-y divide-border">
            {reviewPlatforms
              .filter((platform) => platform.id !== "google")
              .map((platform) => (
                <article
                  key={platform.id}
                  aria-labelledby={`reviews-${platform.id}-title`}
                  className="grid min-w-0 grid-cols-2 items-center justify-items-center gap-x-3 px-4 py-2 text-center lg:px-6"
                >
                  <p
                    className="col-start-1 row-start-1 flex h-7 items-center text-xl font-black leading-7"
                    aria-label={platform.source}
                  >
                    {platform.id === "justdial" ? (
                      <>
                        <span className="text-[#0756a3]">Just</span>
                        <span className="text-[#ad4800]">dial</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#24468e]">India</span>
                        <span className="text-[#bd2026]">MART</span>
                      </>
                    )}
                  </p>
                  <h3
                    id={`reviews-${platform.id}-title`}
                    className="col-start-2 row-start-1 mt-1 text-lg font-black leading-6"
                  >
                    {platform.title}
                  </h3>
                  <p className="sr-only">{platform.description}</p>
                  <div className="col-start-1 row-start-2 flex w-full shrink-0 flex-col items-center gap-0.5">
                    <p className="flex items-baseline gap-1.5 tabular-nums">
                      <span className="text-2xl font-black leading-8">
                        {platform.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-[#525252]">/ 5</span>
                    </p>
                    <span className="inline-flex gap-1" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className="relative text-[#d6d3d1]">
                          <Star className="size-4 fill-current" />
                          <span
                            className="absolute inset-y-0 left-0 overflow-hidden text-[#ad4800]"
                            style={{
                              width: `${Math.min(1, Math.max(0, platform.rating - index)) * 100}%`,
                            }}
                          >
                            <Star className="size-4 fill-current" />
                          </span>
                        </span>
                      ))}
                    </span>
                    <p className="text-sm font-semibold text-[#525252]">
                      {platform.reviewCount.toLocaleString("en-IN")} {platform.reviewCountLabel}
                    </p>
                  </div>
                  <Button
                    asChild
                    className={`col-start-2 row-start-2 h-auto min-h-10 max-w-full whitespace-normal rounded-sm px-3 py-2 text-sm font-bold text-white ${platform.id === "indiamart" ? "bg-[#24468e] hover:bg-[#1b3570]" : "bg-[#0867bd] hover:bg-[#0756a3]"}`}
                  >
                    <a
                      href={platform.listingUrl}
                      aria-label={platform.linkAccessibleLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platform.linkLabel}
                      <ArrowUpRight className="shrink-0" />
                    </a>
                  </Button>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleReviewsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    return mountReviews(containerRef.current, customerReviews);
  }, []);

  return (
    <article className="min-w-0 px-4 py-6 lg:px-6" aria-label="Google customer reviews">
      <div ref={containerRef} />
    </article>
  );
}
