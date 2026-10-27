import { useEffect, useRef } from "react";
import { productRangeContent, type ProductVideo } from "@/lib/site-data";

export function ProductVideoGallery({
  videos,
  active,
  showHeading = true,
}: {
  videos: readonly ProductVideo[];
  active: boolean;
  showHeading?: boolean;
}) {
  const playersRef = useRef(new Map<string, HTMLVideoElement>());

  useEffect(() => {
    const players = [...playersRef.current.values()];
    players.forEach((player) => {
      if (active) void player.play().catch(() => {});
      else player.pause();
    });
    return () => players.forEach((player) => player.pause());
  }, [active, videos]);

  if (!videos.length) return null;

  return (
    <section aria-label={productRangeContent.videosTitle} className="min-w-0">
      {showHeading && (
        <h3 className="mb-3 text-base font-black">{productRangeContent.videosTitle}</h3>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {videos.map((video) => (
          <figure
            key={video.src}
            className="min-w-0 overflow-hidden rounded-md border border-border bg-background"
          >
            <video
              ref={(player) => {
                if (player) playersRef.current.set(video.src, player);
                else playersRef.current.delete(video.src);
              }}
              controls
              autoPlay={active}
              muted
              loop
              playsInline
              preload="metadata"
              poster={video.poster}
              aria-label={video.title}
              className="block h-64 w-full bg-black object-contain sm:h-72"
            >
              <source src={video.src} type="video/mp4" />
              <a href={video.src}>{productRangeContent.videoFallback}</a>
            </video>
          </figure>
        ))}
      </div>
    </section>
  );
}
