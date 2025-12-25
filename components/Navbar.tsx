"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/xmas", label: "Natale" },
  { href: "/", label: "Stanza relax" },
  { href: "/images", label: "Immagini" },
  { href: "/diary", label: "Diario" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col">
        <div className="text-lg font-semibold tracking-tight">
          ✨ Relax Room <span className="text-white/60 text-sm">· piccola, calma, tua</span>
        </div>
        <div className="text-xs text-white/55">Scegli un suono. Respira. Rallenta.</div>
      </div>

      <nav className="flex items-center gap-2">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={[
                "rounded-full px-3 py-1.5 text-sm transition",
                "border border-white/10 bg-white/5 hover:bg-white/10",
                active ? "bg-white/15 border-white/20" : "",
              ].join(" ")}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
