"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export default function MobileNav({ items, ctaLabel }: { items: NavItem[]; ctaLabel: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="メニューを開閉"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-mint"
      >
        <span className="relative block h-4 w-5" aria-hidden>
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-primary/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Drawer */}
      <nav
        aria-label="モバイルナビゲーション"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[80%] max-w-xs flex-col bg-ivory px-6 pb-8 pt-5 shadow-soft transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="メニューを閉じる"
          className="self-end text-2xl leading-none text-primary"
        >
          ×
        </button>
        <ul className="mt-4 flex flex-col gap-1">
          {items.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3 py-3 text-base transition-colors hover:bg-mint ${
                    active ? "font-bold text-primary" : "font-medium text-fg"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/booking"
          onClick={() => setOpen(false)}
          className="mt-6 rounded-full bg-primary px-5 py-3.5 text-center font-bold text-white transition-colors hover:bg-primary-hover"
        >
          {ctaLabel}
        </Link>
      </nav>
    </div>
  );
}
