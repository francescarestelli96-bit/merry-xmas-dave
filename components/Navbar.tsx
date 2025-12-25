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
        <div className="mt-3 rounded-3xl bg-white/6 ring-1 ring-white/12 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-2xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10 group-hover:bg-white/12 transition">
                ✨
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Relax Room</div>
                <div className="text-xs text-white/60">dark • dreamy • simple</div>
              </div>
            </Link>

            <nav className="max-w-[62%] overflow-x-auto whitespace-nowrap no-scrollbar">
              <div className="flex items-center gap-2">
                {nav.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="rounded-2xl bg-white/6 px-3 py-2 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
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
