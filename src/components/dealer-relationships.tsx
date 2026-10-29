import { useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "lucide-react";
import { SectionHeading } from "@/components/page-sections";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  authorizationCertificates,
  appreciationCertificates,
  appreciationContent,
  dealerRelationships,
  type DealerCertificate,
} from "@/lib/site-data";

function CertificateImage({ certificate }: { certificate: DealerCertificate }) {
  const alt = `${certificate.brand}: ${certificate.title}. ${certificate.detail}`;

  return (
    <img
      src={certificate.image}
      alt={alt}
      width={certificate.width}
      height={certificate.height}
      loading="lazy"
      decoding="async"
      className="size-full object-contain"
    />
  );
}

export function DealerRelationships({ appreciation = false }: { appreciation?: boolean }) {
  const certificates = appreciation ? appreciationCertificates : authorizationCertificates;
  const content = appreciation ? appreciationContent : dealerRelationships;
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const active = selected === null ? undefined : certificates[selected];
  const documentWidth = active ? active.width : 0;
  const documentHeight = active ? active.height : 0;

  const resetScroll = () => viewerRef.current?.scrollTo({ left: 0, top: 0 });

  const select = (index: number) => {
    setSelected((index + certificates.length) % certificates.length);
    setZoomed(false);
    resetScroll();
  };

  return (
    <>
      <div className="[&_.text-muted-foreground]:text-background/70">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          text={content.description}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <article
            key={certificate.id}
            className="flex min-w-0 flex-col overflow-hidden rounded-md border border-background/20 bg-background/5"
          >
            <button
              type="button"
              className="group block w-full shrink-0 cursor-zoom-in bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-soft"
              aria-label={`${dealerRelationships.viewLabel}: ${certificate.brand}, ${certificate.title}`}
              onClick={() => select(index)}
            >
              <span
                className="relative block aspect-(--certificate-aspect) sm:aspect-[4/3]"
                style={
                  {
                    "--certificate-aspect": `${certificate.width} / ${certificate.height}`,
                  } as CSSProperties
                }
              >
                <span className="absolute inset-1 block sm:inset-3">
                  <CertificateImage certificate={certificate} />
                </span>
              </span>
            </button>
            <div className="flex flex-1 flex-col px-5 py-4">
              <h3 className="text-xl font-black leading-7 text-background">{certificate.brand}</h3>
              <p className="mt-1 text-sm font-bold leading-5 text-primary-soft">
                {certificate.title}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Dialog
        open={!!active}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            setZoomed(false);
          }
        }}
      >
        {active && (
          <DialogContent className="flex h-dvh max-h-dvh w-full max-w-none flex-col gap-0 overflow-hidden border-0 p-0 sm:h-[94dvh] sm:max-h-[94dvh] sm:w-[calc(100%-1.5rem)] sm:max-w-6xl sm:border [&>button]:grid [&>button]:size-11 [&>button]:place-items-center [&>button]:bg-background [&>button]:opacity-100">
            <DialogHeader className="shrink-0 border-b border-border p-4 pr-12 text-left sm:p-5 sm:pr-12">
              <DialogTitle className="text-xl leading-7">
                {active.brand} — {active.title}
              </DialogTitle>
              <DialogDescription>{active.detail}</DialogDescription>
            </DialogHeader>
            <div
              ref={viewerRef}
              role="region"
              aria-label={dealerRelationships.viewerLabel}
              tabIndex={0}
              className="min-h-0 flex-1 touch-pan-x touch-pan-y touch-pinch-zoom overflow-auto overscroll-contain bg-stone-100 p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:p-5"
            >
              <div
                key={`${active.id}-${zoomed}`}
                className={zoomed ? "shrink-0 bg-white" : "h-full w-full bg-white"}
                style={
                  zoomed
                    ? {
                        width: Math.max(1200, documentWidth),
                        aspectRatio: `${documentWidth} / ${documentHeight}`,
                      }
                    : undefined
                }
              >
                <CertificateImage certificate={active} />
              </div>
            </div>
            <div className="shrink-0 border-t border-border bg-background px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
              <p
                className="mb-2 text-center text-xs leading-5 text-muted-foreground"
                aria-live="polite"
              >
                {zoomed ? dealerRelationships.zoomHint : dealerRelationships.fitHint}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11"
                    aria-label={dealerRelationships.previousLabel}
                    onClick={() => select((selected ?? 0) - 1)}
                  >
                    <ArrowLeft />
                  </Button>
                  <span className="min-w-12 text-center text-sm tabular-nums" aria-live="polite">
                    {(selected ?? 0) + 1} / {certificates.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11"
                    aria-label={dealerRelationships.nextLabel}
                    onClick={() => select((selected ?? 0) + 1)}
                  >
                    <ArrowRight />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="h-11"
                    onClick={() => {
                      setZoomed((value) => !value);
                      resetScroll();
                    }}
                  >
                    {zoomed ? <ZoomOut /> : <ZoomIn />}
                    {zoomed ? dealerRelationships.fitLabel : dealerRelationships.zoomLabel}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
