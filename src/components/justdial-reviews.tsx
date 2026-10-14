import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { justdialReviews } from "@/lib/site-data";

export function JustdialReviews() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    // Justdial populates these containers after its external script executes.
    const checkContent = () => {
      const badge = widget.querySelector("#JdBadge");
      const destination = widget.querySelector("#JdBadgeDest");
      if (!badge?.hasChildNodes() && !destination?.hasChildNodes()) return;
      setStatus("ready");
      window.clearTimeout(timeout);
    };
    const observer = new MutationObserver(checkContent);
    observer.observe(widget, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => setStatus("unavailable"), 15000);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = justdialReviews.scriptSrc;
    script.async = true;
    script.onload = checkContent;
    script.onerror = () => {
      window.clearTimeout(timeout);
      setStatus("unavailable");
    };
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      script.onload = null;
      script.onerror = null;
      script.remove();
    };
  }, []);

  return (
    <section aria-labelledby="customer-reviews-title" className="mb-6 border-y border-border bg-white py-4 text-[#171717] sm:mb-8 lg:py-6">
      <div className="site-container">
        <div className="grid items-center gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
          <div>
            <p className="text-xl font-black leading-6" aria-label={justdialReviews.source}>
              <span className="text-[#0756a3]">{justdialReviews.source.slice(0, 4)}</span><span className="text-[#ad4800]">{justdialReviews.source.slice(4)}</span>
            </p>
            <h2 id="customer-reviews-title" className="mt-1 text-2xl font-black leading-7">
              {justdialReviews.title}
            </h2>
            <p className="mt-1 text-sm leading-5 text-[#525252]">{justdialReviews.description}</p>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-y-2 border-y border-primary/20 py-2 lg:flex-col lg:border-x lg:border-y-0 lg:px-6 lg:py-0">
            <div className={`min-w-0 max-w-full overflow-x-auto text-[#171717] [color-scheme:light] [&_a]:text-[#0756a3] ${status === "ready" ? "mr-3 rounded-sm bg-white p-1.5 lg:mr-0" : ""}`} ref={widgetRef}>
              <div id="JdBadge" data-s1={justdialReviews.badgeStyle} data-s2={justdialReviews.badgeCode} />
              <div id="JdBadgeDest" />
            </div>
            <a href={justdialReviews.listingUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold leading-5 text-[#262626] underline decoration-primary/40 underline-offset-4 hover:text-primary">
              {justdialReviews.reviewCount} {justdialReviews.reviewCountLabel}
            </a>
          </div>
          <div className="flex items-center justify-between gap-3 lg:block lg:justify-self-end">
            <p className="text-sm font-bold leading-5 lg:text-base">{justdialReviews.invitationTitle}</p>
            <Button asChild className="h-auto min-h-11 max-w-full shrink-0 whitespace-normal rounded-sm bg-[#0867bd] px-3 py-2.5 text-left text-sm font-bold text-white hover:bg-[#0756a3] lg:mt-3">
              <a href={justdialReviews.listingUrl} aria-label={justdialReviews.linkAccessibleLabel} target="_blank" rel="noopener noreferrer">
                {justdialReviews.linkLabel}<ArrowUpRight className="shrink-0" />
              </a>
            </Button>
          </div>
        </div>
        <div role="status" aria-live="polite" className="sr-only">
          {status !== "ready" && (
            <p>
              {status === "loading" ? justdialReviews.loadingText : justdialReviews.unavailableText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
