"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type RemoteImg = {
  id: string;
  url: string;
  alt: string;
  credit?: string;
};

const POEMS = [
  "Un dettaglio nuovo. Un respiro più lungo.",
  "La mente si siede. Il rumore si spegne.",
  "Poche cose, fatte bene. Niente caos.",
  "Oggi scegli morbido. Domani scegli luce.",
  "Una stanza dentro la stanza. Silenzio buono.",
  "Non devi correre. Devi solo esserci.",
];

function pickN<T>(arr: T[], n: number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/**
 * Immagini relax da Picsum (semplici e stabili).
 * Usiamo seed + cache-bust così cambiano davvero a ogni refresh.
 */
function buildPicsum(seed: number): RemoteImg {
  // 1200x900 ottimo per card e lightbox
  const url = `https://picsum.photos/seed/relax-${seed}/1200/900`;
  return {
    id: String(seed),
    url,
    alt: "Relax visual",
    credit: "picsum.photos",
  };
}

export default function Gallery() {
  const [nonce, setNonce] = useState(1); // per refresh “vero”
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [fadeKey, setFadeKey] = useState(0);

  const poem = useMemo(() => {
    // cambia poesia ad ogni refresh
    return POEMS[(nonce - 1) % POEMS.length] ?? POEMS[0];
  }, [nonce]);

  const images = useMemo(() => {
    // 12 seed random ad ogni refresh (stabili dentro quel refresh)
    const seeds = Array.from({ length: 24 }, (_, i) => i + 1 + nonce * 1000);
    const picked = pickN(seeds, 6).map(buildPicsum);

    // cache-bust (sennò alcuni browser tengono in cache)
    return picked.map((img) => ({
      ...img,
      url: `${img.url}?v=${nonce}`,
    }));
  }, [nonce]);

  const open = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      return (i + 1) % images.length;
    });
  }, [images.length]);

  const refresh = useCallback(() => {
    setFadeKey((k) => k + 1);
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  const active = activeIndex === null ? null : images[activeIndex];

  return (
    <section className="rr-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="rr-badge">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
            <span>gallery • slow • soft</span>
          </div>

          <div className="text-xl sm:text-2xl font-semibold tracking-tight">
            Gallery
          </div>
          <div className="text-sm text-white/70">
            Immagini che cambiano. Senza fretta.
          </div>
          <div className="mt-2 text-xs text-white/55">{poem}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={refresh}
            className="rr-btn rr-btn-primary"
            aria-label="Rimescola atmosfera"
          >
            ✨ Rimescola atmosfera
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        key={fadeKey}
        className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 animate-softFade"
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => open(i)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-[4/3] w-full">
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70" />
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="text-sm font-semibold text-white/90">
                🌿 Relax visual
              </div>
              <div className="text-xs text-white/55">apri</div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox (VISIBILE, PROMESSO) */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onMouseDown={(e) => {
            // click fuori chiude
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            type="button"
            onClick={close}
            className="rr-btn absolute right-6 top-6 z-20"
          >
            ✕ Chiudi
          </button>

          <div className="absolute left-6 top-6 z-20 text-xs text-white/60">
            ← → per navigare • ESC per chiudere
          </div>

          <button
            type="button"
            onClick={prev}
            className="rr-btn absolute left-6 top-1/2 -translate-y-1/2 z-20"
            aria-label="Immagine precedente"
          >
            ←
          </button>

          <button
            type="button"
            onClick={next}
            className="rr-btn absolute right-6 top-1/2 -translate-y-1/2 z-20"
            aria-label="Immagine successiva"
          >
            →
          </button>

          <div className="relative z-10 max-h-[90vh] max-w-[92vw]">
            <img
              src={active.url}
              alt={active.alt}
              className="max-h-[90vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-3 text-center text-xs text-white/55">
              fonte: {active.credit ?? "web"}
            </div>
          </div>
        </div>
      )}

      {/* Animazione poetica */}
      <style jsx>{`
        @keyframes softFade {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.985);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .animate-softFade {
          animation: softFade 0.55s ease;
        }
      `}</style>
    </section>
  );
}
