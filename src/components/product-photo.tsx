export function ProductPhoto({ src, alt, loading }: { src: string; alt: string; loading?: "lazy" | "eager" }) {
  return (
    <div data-product-photo className="size-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={1672}
        height={941}
        className="size-full object-cover"
      />
    </div>
  );
}
