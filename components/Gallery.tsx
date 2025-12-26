// components/Gallery.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Tile = {
  id: string;
  url: string;
  label: string;
  poem: string;
};

const QUERIES = [
  "forest, mist",
  "ocean, calm",
  "rain, window",
  "mountains, sunrise",
  "night, stars",
  "candle, cozy",
  "zen, minimal",
  "lake, fog",
];

const POEMS = [
  "Un dettaglio nuovo. Un respiro più lungo.",
  "Qui non devi dimostrare niente.",
  "Sposta l’attenzione: da rumore a ritmo.",
  "Non serve correre: basta esserci.",
  "Oggi scegli morbido.",
  "Lascia andare il peso, tieni il calore.",
];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Unsplash random without API key:
 * https://source.unsplash.com/<w>x<h>/?<keywords>&sig=<n>
 * - `sig` changes the image (cache-buster)
 */
function unsplashUrl(query: string, sig: number, w = 1600, h = 1000) {
  const q = encodeURIComponent(query);
  return `https://source.unsplash.com/${w}x${h}/?${q}&sig=${sig}`;
}

export default function Gallery() {
  const [seed, setSeed] = useState(() => Date.now());
  const [open, setOpen] = useState<number | null>(null);

  const tiles: Tile[] = useMemo(() => {
    const poem = pick(POEMS);
    return Array.from({ length: 6 }).map((_, i) => {
      const query = pick(QUERIES);
      return {
        id: `${seed}-${i}`,
        url: unsplashUrl(query, seed + i),
        label: "Relax visual",
        poem,
      };
    });
  }, [seed]);

  const refresh = () => setSeed(Date.now());

  // lightbox controls
  useEffect(() => {
    if (open === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((v) => (v === null ? null : (v + 1) % tiles.length));
      if (e.key === "ArrowLeft") setOpen((v) => (v === null ? null : (v - 1 + tiles.length) % tiles.length));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, tiles.length]);

  return (
    <section className="rr-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Gallery</div>
          <div className="mt-1 text-sm text-white/65">Immagini che cambiano. Senza fretta.</div>
          <div className="mt-2 text-xs text-white/50">{tiles[0]?.poem}</div>
        </div>

        <button type="button" onClick={refresh} className="rr-btn rr-btn-primary self-start">
          ✨ Rimescola atmosfera
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setOpen(idx)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left"
            style={{ aspectRatio: "4 / 3" }}
            title="Apri"
          >
            {/* immagine */}
            <img
              src={t.url}
              alt={t.label}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
              }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.opacity = "0";
              }}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" />
            <div className="absolute inset-0 ring-1 ring-white/0 transition group-hover:ring-white/15" />

            <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
              <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/80 backdrop-blur">
                🌿 {t.label}
              </div>
              <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/70 backdrop-blur">
                ↗ apri
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-sm font-semibold text-white/90">Dettaglio</div>
              <div className="mt-1 text-xs text-white/70">clicca per guardare meglio</div>
            </div>
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onMouseDown={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 p-3">
              <div className="text-xs text-white/70">
                ← → per navigare • ESC per chiudere
              </div>
              <button type="button" className="rr-btn" onClick={() => setOpen(null)}>
                ✕ Chiudi
              </button>
            </div>

            <div className="relative" style={{ aspectRatio: "16 / 10" }}>
              <img
                src={tiles[open].url}
                alt="Relax visual"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-sm font-semibold text-white/90">Respira</div>
                <div className="mt-1 text-xs text-white/75">{tiles[open].poem}</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 p-3">
              <button
                type="button"
                className="rr-btn"
                onClick={() => setOpen((v) => (v === null ? null : (v - 1 + tiles.length) % tiles.length))}
              >
                ← Prima
              </button>
              <button
                type="button"
                className="rr-btn rr-btn-primary"
                onClick={() => setOpen((v) => (v === null ? null : (v + 1) % tiles.length))}
              >
                Dopo →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
