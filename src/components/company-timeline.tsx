import { useEffect, useState } from "react";
import { companyHistory } from "@/lib/site-data";
import { SectionHeading } from "@/components/page-sections";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

export function CompanyTimeline() {
  const [api, setApi] = useState<CarouselApi>();
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!api) return;
    const startDrag = () => setDragging(true);
    const endDrag = () => setDragging(false);
    api.on("pointerDown", startDrag).on("pointerUp", endDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("blur", endDrag);
    return () => {
      api.off("pointerDown", startDrag).off("pointerUp", endDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("blur", endDrag);
    };
  }, [api]);

  useEffect(() => {
    if (!api || keyboardFocused || dragging) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const bounds = api.rootNode().getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      api.scrollNext();
    }, 4000);
    return () => window.clearInterval(timer);
  }, [api, keyboardFocused, dragging]);

  return (
    <section className="pattern-shared py-20" aria-label="Company milestones">
      <div className="site-container">
        <SectionHeading eyebrow={companyHistory.eyebrow} title={companyHistory.title} text={companyHistory.description} />
        <Carousel
          opts={{ align: "start", loop: true, slidesToScroll: 1, dragFree: false, skipSnaps: false, duration: 35 }}
          setApi={setApi}
          className="min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          aria-label="Company history timeline"
          tabIndex={0}
          onPointerDownCapture={() => setKeyboardFocused(false)}
          onFocusCapture={(event) => setKeyboardFocused(event.target.matches(":focus-visible"))}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false); }}
        >
          <p className="mb-5 text-sm font-bold tracking-wider text-muted-foreground">
            {companyHistory.milestones[0].year} <span className="mx-2 text-primary" aria-hidden="true">—</span> {companyHistory.milestones[companyHistory.milestones.length - 1]?.year}
          </p>
          <CarouselContent className="-ml-4 items-stretch touch-pan-y pb-1" aria-live="off">
            {companyHistory.milestones.map((milestone) => (
              <CarouselItem key={milestone.year} className="flex basis-[85%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" aria-label={`${milestone.year}: ${milestone.description}`}>
                <article className="flex w-full flex-col rounded-sm border border-border border-t-4 border-t-primary bg-background p-5 shadow-sm">
                  <h3 className="text-4xl font-black leading-none tracking-tight text-primary"><time dateTime={milestone.year}>{milestone.year}</time></h3>
                  <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-foreground/80">{milestone.description}</p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
