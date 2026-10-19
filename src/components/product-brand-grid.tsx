import { getBrandLogo, productRangeContent } from "@/lib/site-data";

export function ProductBrandGrid({ brands }: { brands: readonly string[] }) {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-2.5" aria-label={productRangeContent.brandsTitle}>
      {brands.map((brand) => {
        const logo = getBrandLogo(brand);
        return (
          <li
            key={brand}
            className="flex h-20 min-w-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white sm:h-24"
            title={brand}
            style={{ backgroundColor: logo?.background }}
          >
            {logo?.stripFrame ? (
              <svg
                viewBox={logo.stripFrame.viewBox}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={`${brand} logo`}
                className="size-full"
              >
                <image
                  href={logo.src}
                  width={logo.stripFrame.width}
                  height={logo.stripFrame.height}
                />
              </svg>
            ) : logo ? (
              <img
                src={logo.src}
                alt={`${brand} logo`}
                width={210}
                height={96}
                draggable={false}
                className="size-full object-contain"
              />
            ) : (
              <span className="break-words p-2 text-center text-xs font-semibold text-foreground sm:text-sm">
                {brand}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
