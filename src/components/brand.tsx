import logo from "@/assets/rb-logo.jpeg";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <img
        src={logo}
        alt="RB International Belting and Automation logo"
        width={56}
        height={56}
        className="size-12 shrink-0 rounded-full object-contain sm:size-14"
      />
      <div className="min-w-0">
        <strong className={`block truncate font-extrabold uppercase leading-tight text-foreground ${compact ? "text-xs sm:text-sm" : "text-sm"}`}>
          RB International
        </strong>
        <span className="block truncate text-[9px] font-semibold uppercase text-muted-foreground sm:text-[10px]">
          Belting & Automation
        </span>
      </div>
    </div>
  );
}
