// app/page.tsx
"use client";

import Link from "next/link";
import SoundMixer from "@/components/SoundMixer";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-white/6 ring-1 ring-white/12 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        {/* glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl"
        />

        <div className="relative p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            build ok • deploy live • vibe in arrivo
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Stanza relax
          </h1>

          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
            Quando il mondo fa rumore, qui scegli un suono e rallenti. Pochi elementi,
            tanto respiro. Una piccola bolla “tuo posto sicuro”.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/images"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/18 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              🌙 Gallery
              <span className="text-white/60">→</span>
            </Link>

            <Link
              href="/diary"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/6 px-4 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/12 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              📝 Diario
              <span className="text-white/60">→</span>
            </Link>

            <Link
              href="/xmas"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500/25 to-indigo-500/25 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:from-pink-500/30 hover:to-indigo-500/30 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              🎄 Xmas
              <span className="text-white/70">→</span>
            </Link>
          </div>

          {/* micro features */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-white/60">Focus</div>
              <div className="mt-1 text-sm font-semibold">Modalità “soft”</div>
              <div className="mt-1 text-xs text-white/60">poche scelte, zero caos</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-white/60">Suono</div>
              <div className="mt-1 text-sm font-semibold">Scene pulite</div>
              <div className="mt-1 text-xs text-white/60">play, volume, stop</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-white/60">Diario</div>
              <div className="mt-1 text-sm font-semibold">Note veloci</div>
              <div className="mt-1 text-xs text-white/60">senza giudizio</div>
            </div>
          </div>
        </div>
      </section>

      {/* MIXER */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Sound</h2>
            <p className="mt-1 text-sm text-white/65">
              Scegli una scena e regola il volume. Niente fronzoli, solo vibe.
            </p>
          </div>
        </div>

        <SoundMixer />
      </section>
    </div>
  );
}
