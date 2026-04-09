import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Brotkrumen" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-black/40 dark:text-white/35">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span className="text-black/20 dark:text-white/15" aria-hidden>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-accent-vibrant transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-black/70 dark:text-white/50 max-w-[min(100%,280px)] truncate">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
