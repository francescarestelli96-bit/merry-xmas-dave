"use client";

import { useMemo, useState } from "react";

const POEMS = [
  "Cambia aria. Non serve un motivo.",
  "Un dettaglio nuovo. Un respiro più lungo.",
  "Oggi basta poco: luce, calma, spazio.",
  "Il mondo corre. Qui no.",
  "Rimescola, ma con gentilezza.",
  "Stessa stanza. Nuova atmosfera.",
];

// ✅ METTI QUI I NOMI DEI FILE CHE HAI in /public/images
// Esempio: public/images/01.jpg  ->  "/images/01.jpg"
const LOCAL_IMAGES: string[] = [
  "/images/01.jpg",
  "/images/02.jpg",
  "/images/03.jpg",
  "/images/04.jpg",
  "/images/05.jpg",
  "/images/06.jpg",
  // aggiungi quanti vuoi
];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffled<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Gallery() {
  const [seed, setSeed] = useState(() => Date.now());
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  const poem = useMemo(() => pick(POEMS), [seed]);

  const images = useMemo(() => {
    // prendi 6 a caso (o meno se ne hai poche)
    return shuffled(LOCAL_IMAGES).slice(0, 6);
  }, [seed]);

  const refresh = () => {
    setBroken({});
    setSeed(Date.now());
  };

  return (
    <section className="rr-card p-5 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold">Gallery</div>
          <div className="mt-1 text-xs text-white/60">{poem}</div>
        </div>

        <button
          type="button"
          onClick={refresh}
          className="rr-btn"
          aria-label="Rimescola atmosfera"
        >
          ✨ Rimescola atmosfera
        </button>
      </div>

      {LOCAL_IMAGES.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          Nessuna immagine configurata. Metti file in <span className="text-white/85">public/images</span> e
          aggiorna l’array <span className="text-white/85">LOCAL_IMAGES</span> in <span className="text-white/85">Gallery.tsx</span>.
        </div>
      ) : (
        <div key={seed} className="grid grid-cols-2 gap-4 sm:grid-cols-3 rr-fade">
          {images.map((src) => {
            const isBroken = !!broken[src];
            return (
              <figure
                key={src}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5"
              >
                {isBroken ? (
                  <div className="flex aspect-square w-full items-center justify-center p-4 text-center text-xs text-white/60">
                    Immagine non trovata:
                    <br />
                    <span className="mt-2 block text-white/80">{src}</span>
                  </div>
                ) : (
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    onError={() => setBroken((p) => ({ ...p, [src]: true }))}
                    className="aspect-square w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-95"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </figure>
            );
          })}
        </div>
      )}

      {/* Fade safe */}
      <style>{`
        .rr-fade { animation: rrSoftFade .6s ease; }
        @keyframes rrSoftFade {
          from { opacity: 0; transform: scale(.985); filter: blur(2px); }
          to   { opacity: 1; transform: scale(1);    filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
