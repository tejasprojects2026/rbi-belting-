import { getImageAlt } from "@/lib/site-data";

export function ProductPhoto({ src, alt, loading, fit = "cover" }: { src: string; alt: string; loading?: "lazy" | "eager"; fit?: "cover" | "contain" }) {
  return (
    <div data-product-photo className="size-full overflow-hidden">
      <img
        src={src}
        alt={getImageAlt(src, alt)}
        loading={loading}
        width={1672}
        height={941}
        className={fit === "contain" ? "size-full object-contain" : "size-full object-cover"}
      />
    </div>
  );
}
