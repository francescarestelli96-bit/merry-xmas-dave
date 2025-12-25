// app/page.tsx
"use client";

import Link from "next/link";
import SoundMixer from "@/components/SoundMixer";

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-3xl bg-white/6 ring-1 ring-white/12 p-4 hover:bg-white/7 transition">
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-1 text-sm font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-white/55">{hint}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="relative overflow-hidden rounded-[28px] bg-white/6 ring-1 ring-white/12 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        {/* glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-cyan-400/14 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            online • stabile • pronto a essere bello
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Stanza relax
          </h1>

          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
            Quando il mondo fa rumore, qui scegli un suono e rallenti. Poche cose, fatte bene.
            Niente caos. Solo respiro.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/images"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/18 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              🌙 Gallery <span className="text-white/60">→</span>
            </Link>

            <Link
              href="/diary"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/6 px-4 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/12 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              📝 Diario <span className="text-white/60">→</span>
            </Link>

            <Link
              href="/xmas"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500/25 to-indigo-500/25 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:from-pink-500/30 hover:to-indigo-500/30 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              🎄 Xmas <span className="text-white/70">→</span>
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label="Mood" value="Soft focus" hint="poche scelte, massimo calm" />
            <Stat label="Suono" value="Scene pulite" hint="play + volume, stop" />
            <Stat label="Diario" value="Note veloci" hint="zero giudizio, solo verità" />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Sound</h2>
            <p className="mt-1 text-sm text-white/65">
              Scegli una scena. Regola il volume. Fine. (Ed è bellissimo così.)
            </p>
          </div>
        </div>

        <SoundMixer />
      </section>
    </div>
  );
}
