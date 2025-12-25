// app/xmas/page.tsx
import Link from "next/link";
import { SPECIAL_MESSAGE } from "@/lib/specialMessage";

export const dynamic = "force-static";

export default function XmasPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-[28px] bg-white/6 ring-1 ring-white/12 backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-400/18 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-indigo-500/18 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            🎄 Xmas edition
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {SPECIAL_MESSAGE.title}
          </h1>

          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/80 sm:text-base">
            {SPECIAL_MESSAGE.body}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/18 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              ✨ Torna alla stanza
            </Link>

            <Link
              href="/diary"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/6 px-4 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/12 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              📝 Scrivi due righe
            </Link>
          </div>

          <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-xs text-white/60">
            Oggi si va piano. Domani si spacca. 🙂
          </div>
        </div>
      </div>
    </section>
  );
}
