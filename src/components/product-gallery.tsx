import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { ProductPhoto } from "@/components/product-photo";

type ProductGalleryPhoto = { image: string; title: string; note: string };

export function ProductGallery({ photos, active, eyebrow, compact = false }: { photos: ProductGalleryPhoto[]; active: boolean; eyebrow?: string; compact?: boolean }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(motion.matches);
      setPlaying(!motion.matches);
    };
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, [active]);

  useEffect(() => {
    if (!api) return;
    const select = () => setSelected(api.selectedScrollSnap());
    const startDrag = () => setDragging(true);
    const endDrag = () => setDragging(false);
    select();
    api.on("select", select).on("reInit", select).on("pointerDown", startDrag).on("pointerUp", endDrag);
    return () => {
      api.off("select", select).off("reInit", select).off("pointerDown", startDrag).off("pointerUp", endDrag);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !active || !playing || dragging || photos.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 4000);
    return () => window.clearInterval(timer);
  }, [api, active, playing, dragging, selected, photos.length]);

  const current = photos[selected] ?? photos[0];
  if (!current) return null;
  const multiple = photos.length > 1;
  const arrowClass = "top-1/2 size-9 rounded-sm border-0 bg-background/85 text-foreground shadow-sm hover:bg-background";

  return (
    <Carousel
      opts={{ loop: multiple, align: "start", duration: reducedMotion ? 0 : 20 }}
      setApi={setApi}
      className="min-w-0 bg-foreground text-background"
      aria-label="Product photos"
    >
      <div className="relative">
        <CarouselContent className="ml-0 touch-pan-y" aria-live="off">
          {photos.map((item, index) => (
            <CarouselItem key={item.image} className="aspect-[16/9] pl-0" aria-hidden={selected !== index} aria-label={`${index + 1} of ${photos.length}: ${item.title}`}>
              <ProductPhoto src={item.image} alt={item.title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {multiple && (
          <>
            <CarouselPrevious className={`${arrowClass} left-3`} aria-label="Previous product image" title="Previous product image" />
            <CarouselNext className={`${arrowClass} right-3`} aria-label="Next product image" title="Next product image" />
            <span className="absolute bottom-3 left-3 bg-foreground/75 px-2 py-1 text-xs font-bold tabular-nums">{selected + 1} / {photos.length}</span>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute bottom-3 right-3 size-9 bg-background/85 text-foreground hover:bg-background"
              aria-label={playing ? "Pause product slideshow" : "Play product slideshow"}
              title={playing ? "Pause product slideshow" : "Play product slideshow"}
              onClick={() => setPlaying(value => !value)}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </Button>
          </>
        )}
      </div>
      <div className={compact ? "p-3" : "p-5"} aria-live={playing ? "off" : "polite"} aria-atomic="true">
        {eyebrow && <p className="eyebrow text-primary-soft">{eyebrow}</p>}
        <h3 className={compact ? "text-base font-black leading-6" : "mt-2 text-xl font-black leading-7 sm:text-2xl sm:leading-8"}>{current.title}</h3>
      </div>
    </Carousel>
  );
}
