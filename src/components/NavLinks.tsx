"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export default function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="メインナビゲーション" className="hidden items-center gap-7 text-sm font-medium lg:flex">
      {items.map((n) => {
        const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`relative py-1 transition-colors hover:text-primary ${
              active ? "font-bold text-primary" : "text-fg/80"
            }`}
          >
            {n.label}
            {active && <span aria-hidden className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-accent" />}
          </Link>
        );
      })}
    </nav>
  );
}
