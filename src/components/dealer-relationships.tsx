import { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
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

function CertificateImage({
  certificate,
  preview = false,
}: {
  certificate: DealerCertificate;
  preview?: boolean;
}) {
  const alt = `${certificate.brand}: ${certificate.title}`;
  const cropPosition = preview ? certificate.previewCropPosition : undefined;

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
      className={cropPosition ? "size-full object-cover" : "size-full object-contain"}
      style={cropPosition ? { objectPosition: cropPosition } : undefined}
    />
  );
}

export function DealerRelationships() {
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const active = selected === null ? undefined : dealerCertificates[selected];

  const select = (index: number) => {
    setSelected((index + dealerCertificates.length) % dealerCertificates.length);
    setZoomed(false);
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
              className="group relative block aspect-[4/3] w-full shrink-0 cursor-zoom-in bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-soft"
              aria-label={`${dealerRelationships.viewLabel}: ${certificate.brand}, ${certificate.title}`}
              onClick={() => select(index)}
            >
              <span className="absolute inset-3 block">
                <CertificateImage certificate={certificate} preview />
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 rounded-full bg-foreground/80 p-2 text-background transition-colors group-hover:bg-primary"
              >
                <Maximize2 className="size-4" />
              </span>
            </button>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm font-bold text-primary-soft">{certificate.brand}</p>
              <h3 className="mt-1 text-lg font-black leading-6">{certificate.title}</h3>
              <p className="mt-2 text-sm leading-6 text-background/70">{certificate.detail}</p>
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
          <DialogContent className="flex max-h-[94dvh] w-[calc(100%-1.5rem)] max-w-6xl flex-col gap-0 overflow-hidden p-0">
            <DialogHeader className="shrink-0 border-b border-border p-4 pr-12 text-left sm:p-5 sm:pr-12">
              <DialogTitle className="text-xl leading-7">
                {active.brand} — {active.title}
              </DialogTitle>
              <DialogDescription>{active.detail}</DialogDescription>
            </DialogHeader>
            <div className="min-h-0 overflow-auto bg-stone-100 p-3 sm:p-5">
              <div
                key={`${active.id}-${zoomed}`}
                className={
                  zoomed
                    ? "h-[120dvh] min-w-[1200px] bg-white"
                    : "h-[56dvh] w-full bg-white sm:h-[64dvh]"
                }
              >
                <CertificateImage certificate={active} />
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-background p-3 sm:px-5">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
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
                  aria-label={dealerRelationships.nextLabel}
                  onClick={() => select((selected ?? 0) + 1)}
                >
                  <ArrowRight />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setZoomed((value) => !value)}>
                  {zoomed ? <ZoomOut /> : <ZoomIn />}
                  {zoomed ? dealerRelationships.fitLabel : dealerRelationships.zoomLabel}
                </Button>
                <Button variant="outline" asChild>
                  <a href={active.image} target="_blank" rel="noopener noreferrer">
                    {dealerRelationships.originalLabel}
                    <ExternalLink />
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
