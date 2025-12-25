// app/xmas/page.tsx
import { SPECIAL_MESSAGE } from "@/lib/specialMessage";

export const dynamic = "force-static"; // opzionale: rende chiaro che è statica

export default function XmasPage() {
  return (
    <section className="mx-auto mt-6 max-w-3xl">
      <div className="glass card relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-0 h-64 w-64 rounded-full bg-pink-400/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl"
        />

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {SPECIAL_MESSAGE.title}
        </h1>

        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
          {SPECIAL_MESSAGE.body}
        </div>

        <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-white/75">
          <div className="font-semibold text-white/85">Nota tecnica (non fa male)</div>
          <div className="mt-1">
            Questa pagina evita <span className="text-white/90">useSearchParams</span> e robe client-only in page server,
            quindi niente “prerender killer” su Vercel.
          </div>
        </div>
      </div>
    </section>
  );
}
