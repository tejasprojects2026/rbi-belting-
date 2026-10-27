import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  divisionCardContent,
  divisionCards,
  pillarList,
  type DivisionCardPhoto,
} from "@/lib/site-data";

function DivisionPhotos({ name, photos }: { name: string; photos: readonly DivisionCardPhoto[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(motion.matches);
    update();
    motion.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      {
        threshold: 0.15,
      },
    );
    if (frame.current) observer.observe(frame.current);
    return () => {
      motion.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const select = () => setSelected(api.selectedScrollSnap());
    const startDrag = () => setDragging(true);
    const endDrag = () => setDragging(false);
    select();
    api
      .on("select", select)
      .on("reInit", select)
      .on("pointerDown", startDrag)
      .on("pointerUp", endDrag);
    return () => {
      api
        .off("select", select)
        .off("reInit", select)
        .off("pointerDown", startDrag)
        .off("pointerUp", endDrag);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !visible || dragging || photos.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 4000);
    return () => window.clearInterval(timer);
  }, [api, visible, dragging, selected, photos.length]);

  return (
    <div ref={frame} className="shrink-0">
      <Carousel
        opts={{ loop: true, align: "start", duration: reducedMotion ? 0 : 25 }}
        setApi={setApi}
        className="relative overflow-hidden bg-muted"
        aria-label={`${name} images`}
      >
        <CarouselContent className="ml-0 touch-pan-y" aria-live="off">
          {photos.map((photo, index) => (
            <CarouselItem
              key={photo.src}
              className="relative aspect-[16/10] overflow-hidden pl-0"
              aria-hidden={selected !== index}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={960}
                height={600}
                loading={index <= 1 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="absolute inset-0 size-full object-cover object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3">
          <span
            className="w-fit max-w-full rounded-sm border border-border bg-background/95 px-3 py-1.5 text-center text-xs font-bold text-foreground shadow-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            {photos[selected]?.label ?? photos[selected]?.alt ?? name}
          </span>
        </div>
      </Carousel>
    </div>
  );
}

export function PillarCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {pillarList.map((pillar, index) => {
        const card = divisionCards[pillar.key];
        return (
          <article
            key={pillar.key}
            className={`pillar-card pillar-${pillar.key} flex min-w-0 flex-col overflow-hidden`}
          >
            <DivisionPhotos name={pillar.name} photos={card.photos} />
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <span className="eyebrow">
                {divisionCardContent.divisionLabel} {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-bold leading-7">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
              <div className="mt-auto pt-4">
                <Button
                  asChild
                  variant="link"
                  className="h-10 justify-start p-0 text-sm text-category"
                >
                  <Link
                    to={`/${pillar.key}` as "/power-transmission" | "/automation" | "/adhesives"}
                  >
                    {divisionCardContent.linkLabel}
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
