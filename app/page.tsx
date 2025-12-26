// app/page.tsx
"use client";

import SoundMixer from "@/components/SoundMixer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rr-card p-6 sm:p-8">
        <div className="rr-badge">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
          <span>online • stabile • pronto a essere bello</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
          Stanza relax
        </h1>

        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/75">
          Quando il mondo fa rumore, qui scegli un suono e rallenti.
          Poche cose, fatte bene. Niente caos. Solo respiro.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/images" className="rr-btn">
            🌙 Gallery →
          </Link>
          <Link href="/diary" className="rr-btn">
            📝 Diario →
          </Link>
          <Link href="/xmas" className="rr-btn rr-btn-primary">
            🎄 Xmas →
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/55">Mood</div>
            <div className="mt-1 font-semibold">Soft focus</div>
            <div className="mt-1 text-xs text-white/60">poche scelte, massimo calm</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/55">Suono</div>
            <div className="mt-1 font-semibold">Scene pulite</div>
            <div className="mt-1 text-xs text-white/60">play + volume, stop</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/55">Diario</div>
            <div className="mt-1 font-semibold">Note veloci</div>
            <div className="mt-1 text-xs text-white/60">zero giudizio, solo verità</div>
          </div>
        </div>
      </section>

      <div>
        <h2 className="px-1 text-lg font-semibold">Sound</h2>
        <p className="mt-1 px-1 text-sm text-white/65">
          Scegli una scena. Regola il volume. Fine. (Ed è bellissimo così.)
        </p>
        <div className="mt-4">
          <SoundMixer />
        </div>
      </div>
    </div>
  );
}
