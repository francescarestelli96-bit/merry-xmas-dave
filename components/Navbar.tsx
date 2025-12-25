// components/Navbar.tsx
import Link from "next/link";

const nav = [
  { href: "/", label: "Stanza" },
  { href: "/images", label: "Immagini" },
  { href: "/diary", label: "Diario" },
  { href: "/xmas", label: "Xmas" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="glass mt-3 rounded-2xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="focus-ring flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                ✨
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Relax Room</div>
                <div className="text-xs text-white/65">dark • dreamy • simple</div>
              </div>
            </Link>

            <nav className="flex items-center gap-1">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="focus-ring rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white transition"
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
