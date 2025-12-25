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
        <div className="mt-3 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                ✨
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Relax Room</div>
                <div className="text-xs text-white/60">dark • dreamy • simple</div>
              </div>
            </Link>

            {/* Mobile safe: overflow-x + gap + pill buttons */}
            <nav className="max-w-[60%] overflow-x-auto whitespace-nowrap">
              <div className="flex items-center gap-2">
                {nav.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="rounded-xl px-3 py-2 text-sm text-white/75 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
