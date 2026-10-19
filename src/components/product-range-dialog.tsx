import { useState } from "react";
import { Check, ChevronDown, MessageSquareText, PlayCircle } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { ProductBrandGrid } from "@/components/product-brand-grid";
import { ProductVideoGallery } from "@/components/product-video-gallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  productRangeContent,
  productVideoShowcases,
  type Pillar,
  type ProductShowcasePhoto,
  type SubCategory,
} from "@/lib/site-data";

type ProductRangeDialogProps = {
  pillar: Pillar;
  sub: SubCategory | null;
  photos: readonly ProductShowcasePhoto[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnquire: (sub: SubCategory) => void;
};

export function ProductRangeDialog({
  pillar,
  sub,
  photos,
  open,
  onOpenChange,
  onEnquire,
}: ProductRangeDialogProps) {
  const [videosOpen, setVideosOpen] = useState(false);
  const [detailsTab, setDetailsTab] = useState("types");
  if (!sub) return null;
  const videos = productVideoShowcases[`${pillar.key}/${sub.slug}`] ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`theme-${pillar.key} flex max-h-[94dvh] w-[calc(100%-1.5rem)] max-w-5xl flex-col gap-0 overflow-hidden rounded-2xl border-border/80 bg-background p-0 shadow-2xl sm:max-w-5xl [&>button]:grid [&>button]:size-10 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-muted [&>button]:opacity-100`}
      >
        <DialogHeader className="shrink-0 space-y-1 border-b border-border/70 px-5 py-4 pr-16 text-left sm:px-6 sm:pr-16">
          <p className="w-fit rounded-full bg-category/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-category">
            {pillar.name}
          </p>
          <DialogTitle className="text-2xl font-bold leading-tight sm:text-[28px]">
            {sub.name}
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5">
          <DialogDescription className="mb-5 max-w-3xl text-sm leading-6 text-muted-foreground">
            {sub.short}
          </DialogDescription>
          <div className="grid gap-5 md:h-[clamp(20rem,48dvh,24rem)] md:grid-cols-2 md:grid-rows-[minmax(0,1fr)] md:gap-6">
            <div className="relative min-w-0 md:min-h-0">
              <ProductGallery key={sub.slug} photos={photos} active={open} compact />
            </div>

            <Tabs
              key={sub.slug}
              value={detailsTab}
              onValueChange={setDetailsTab}
              className="flex min-w-0 flex-col md:min-h-0"
            >
              <TabsList
                aria-label={productRangeContent.detailsLabel}
                className="grid h-auto w-full shrink-0 grid-cols-3 gap-1 rounded-xl bg-muted/80 p-1"
              >
                <TabsTrigger
                  value="types"
                  className="min-h-10 min-w-0 whitespace-normal rounded-lg px-2 text-xs font-semibold leading-4 sm:text-sm"
                >
                  {productRangeContent.typesTabLabel}
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="min-h-10 min-w-0 whitespace-normal rounded-lg px-2 text-xs font-semibold leading-4 sm:text-sm"
                >
                  {productRangeContent.applicationsTitle}
                </TabsTrigger>
                <TabsTrigger
                  value="brands"
                  className="min-h-10 min-w-0 whitespace-normal rounded-lg px-2 text-xs font-semibold leading-4 sm:text-sm"
                >
                  {productRangeContent.brandsTabLabel}
                </TabsTrigger>
              </TabsList>

              <div className="grid min-w-0 flex-1 md:min-h-0 md:grid-rows-[minmax(0,1fr)]">
                <TabsContent
                  value="types"
                  forceMount
                  inert={detailsTab !== "types"}
                  aria-hidden={detailsTab !== "types"}
                  className="mt-3 min-h-44 sm:min-h-64 [grid-area:1/1] data-[state=inactive]:invisible overflow-hidden rounded-xl border border-border/70 bg-muted/20 p-4 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:[scrollbar-gutter:stable]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      {productRangeContent.typesTitle}
                    </h3>
                    <span className="rounded-full bg-category/8 px-2 py-0.5 text-xs font-semibold tabular-nums text-category">
                      {sub.types.length}
                    </span>
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {sub.types.map((type) => (
                      <li
                        key={type}
                        className="flex items-start gap-2 rounded-lg border border-border/60 bg-background px-3 py-2.5 text-sm font-medium leading-5 text-foreground"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-category/80"
                          aria-hidden="true"
                        />
                        <span>{type}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent
                  value="applications"
                  forceMount
                  inert={detailsTab !== "applications"}
                  aria-hidden={detailsTab !== "applications"}
                  className="mt-3 min-h-44 sm:min-h-64 [grid-area:1/1] data-[state=inactive]:invisible rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-5 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:[scrollbar-gutter:stable]"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {productRangeContent.applicationsTitle}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-foreground/85">
                    {sub.applications}
                  </p>
                  <section className="mt-4 border-t border-border/70 pt-4">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">
                      {productRangeContent.quoteTitle}
                    </h4>
                    <ul className="space-y-2 pb-1 text-sm leading-6 text-muted-foreground">
                      {productRangeContent.quoteDetails.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check
                            className="mt-1 size-3.5 shrink-0 text-category/70"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </TabsContent>

                <TabsContent
                  value="brands"
                  forceMount
                  inert={detailsTab !== "brands"}
                  aria-hidden={detailsTab !== "brands"}
                  className="mt-3 min-h-44 sm:min-h-64 [grid-area:1/1] data-[state=inactive]:invisible rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-5 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:[scrollbar-gutter:stable]"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {productRangeContent.brandsTitle}
                  </h3>
                  <ProductBrandGrid brands={sub.brands} />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {videos.length > 0 && (
            <details
              key={sub.slug}
              onToggle={(event) => setVideosOpen(event.currentTarget.open)}
              className="group mt-4 rounded-xl border border-border/70 bg-muted/20 px-4"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-category [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <PlayCircle className="size-4 text-category" aria-hidden="true" />
                  {productRangeContent.videosTitle}
                  <span className="text-xs text-muted-foreground">{videos.length}</span>
                </span>
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              {videosOpen && (
                <div className="pb-4">
                  <ProductVideoGallery
                    key={sub.slug}
                    videos={videos}
                    active={open}
                    showHeading={false}
                  />
                </div>
              )}
            </details>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-5 border-t border-border/70 bg-background px-5 py-3 sm:px-6">
          <p className="hidden max-w-md text-sm leading-5 text-muted-foreground sm:block">
            {productRangeContent.enquiryHint}
          </p>
          <Button
            type="button"
            size="lg"
            className="h-11 w-full shrink-0 rounded-lg sm:w-auto sm:px-7"
            onClick={() => onEnquire(sub)}
          >
            <MessageSquareText />
            {productRangeContent.enquiryLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
