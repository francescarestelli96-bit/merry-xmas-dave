// app/page.tsx
"use client";

import SoundMixer from "@/components/SoundMixer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6 px-2 sm:px-0 overflow-x-hidden">
      <section className="rr-card p-5 sm:p-8">
        <div className="rr-badge flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80 animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80">online • stabile • pronto</span>
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tighter uppercase italic" style={{ fontFamily: 'Georgia, serif' }}>
          Stanza relax
        </h1>

        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70 italic">
          Quando il mondo fa rumore, qui scegli un suono e rallenti.
          Poche cose, fatte bene. Niente caos. Solo respiro.
        </p>

        {/* Bottoni: Stacked su mobile, Row su desktop */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/images" className="rr-btn text-center justify-center py-4 sm:py-2">
            🌙 Gallery →
          </Link>
          <Link href="/diary" className="rr-btn text-center justify-center py-4 sm:py-2">
            📝 Diario →
          </Link>
          <Link href="/xmas" className="rr-btn rr-btn-primary text-center justify-center py-4 sm:py-2">
            🎄 Xmas →
          </Link>
        </div>

        {/* Info Cards: 1 colonna su mobile, 3 su desktop */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Mood</div>
            <div className="mt-1 font-semibold text-lg">Soft focus</div>
            <div className="mt-1 text-xs text-white/50 italic leading-relaxed">poche scelte, massimo calm</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Suono</div>
            <div className="mt-1 font-semibold text-lg">Scene pulite</div>
            <div className="mt-1 text-xs text-white/50 italic leading-relaxed">play + volume, stop</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Diario</div>
            <div className="mt-1 font-semibold text-lg">Note veloci</div>
            <div className="mt-1 text-xs text-white/50 italic leading-relaxed">zero giudizio, solo verità</div>
          </div>
        </div>
      </section>

      <div className="px-1 py-4">
        <h2 className="text-xl font-semibold tracking-tight uppercase italic text-white/90">Sound</h2>
        <p className="mt-2 text-sm text-white/50 italic">
          Scegli una scena. Regola il volume. Fine.
        </p>
        <div className="mt-6 w-full overflow-hidden">
          <SoundMixer />
        </div>
      </div>

      <footer className="mt-10 pb-8 px-1">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#FFD700] font-bold opacity-40">
            Access restricted to authorized personnel only
          </p>
      </footer>
    </div>
  );
}