import { useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
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
  dealerCertificates,
  dealerRelationships,
  type CertificateFrame,
  type DealerCertificate,
} from "@/lib/site-data";

// Map the photographed document's four corners onto a straight rectangle.
// CSS changes its presentation while preserving the original image and text.
function frameTransform({ width, height, sourceCorners }: CertificateFrame) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = sourceCorners;
  const dx1 = x1 - x2,
    dx2 = x3 - x2,
    dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2,
    dy2 = y3 - y2,
    dy3 = y0 - y1 + y2 - y3;
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  const a = x1 - x0 + g * x1,
    b = x3 - x0 + h * x3,
    c = x0;
  const d = y1 - y0 + g * y1,
    e = y3 - y0 + h * y3,
    f = y0;
  const scale = a * e - b * d;
  return `matrix3d(${[
    ((e - f * h) * width) / scale,
    ((f * g - d) * height) / scale,
    0,
    (d * h - e * g) / scale,
    ((c * h - b) * width) / scale,
    ((a - c * g) * height) / scale,
    0,
    (b * g - a * h) / scale,
    0,
    0,
    1,
    0,
    ((b * f - c * e) * width) / scale,
    ((c * d - a * f) * height) / scale,
    0,
    1,
  ].join(",")})`;
}

function CertificateImage({ certificate }: { certificate: DealerCertificate }) {
  const alt = `${certificate.brand}: ${certificate.title}. ${certificate.detail}`;

  if (certificate.frame) {
    const { width, height } = certificate.frame;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="size-full" role="img" aria-label={alt}>
        <foreignObject width={width} height={height}>
          <div style={{ width, height, position: "relative", overflow: "hidden" }}>
            <img
              src={certificate.image}
              alt=""
              width={certificate.width}
              height={certificate.height}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: certificate.width,
                height: certificate.height,
                maxWidth: "none",
                transformOrigin: "0 0",
                transform: frameTransform(certificate.frame),
              }}
            />
          </div>
        </foreignObject>
      </svg>
    );
  }

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

export function DealerRelationships() {
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const active = selected === null ? undefined : dealerCertificates[selected];
  const documentWidth = active ? (active.frame?.width ?? active.width) : 0;
  const documentHeight = active ? (active.frame?.height ?? active.height) : 0;

  const resetScroll = () => viewerRef.current?.scrollTo({ left: 0, top: 0 });

  const select = (index: number) => {
    setSelected((index + dealerCertificates.length) % dealerCertificates.length);
    setZoomed(false);
    resetScroll();
  };

  return (
    <>
      <div className="[&_.text-muted-foreground]:text-background/70">
        <SectionHeading
          eyebrow={dealerRelationships.eyebrow}
          title={dealerRelationships.title}
          text={dealerRelationships.description}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dealerCertificates.map((certificate, index) => (
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
                    "--certificate-aspect": `${certificate.frame?.width ?? certificate.width} / ${certificate.frame?.height ?? certificate.height}`,
                  } as CSSProperties
                }
              >
                <span className="absolute inset-1 block sm:inset-3">
                  <CertificateImage certificate={certificate} />
                </span>
              </span>
              <span className="flex min-h-11 items-center justify-center gap-2 border-t border-border px-3 py-2 text-sm font-semibold text-primary transition-colors group-hover:bg-muted">
                <Maximize2 className="size-4" aria-hidden="true" />
                {dealerRelationships.enlargeLabel}
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
                    {(selected ?? 0) + 1} / {dealerCertificates.length}
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
