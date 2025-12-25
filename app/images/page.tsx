"use client";

import { useMemo, useState } from "react";

const TOPICS = ["ocean", "rain", "forest", "mountains", "cozy", "sunset", "mist", "snow", "lake"];

function mkUrl(topic: string, seed: string) {
  // Unsplash source: no API key, random but stable per seed
  return `https://source.unsplash.com/1600x1000/?${encodeURIComponent(topic)}&sig=${encodeURIComponent(seed)}`;
}

export default function ImagesPage() {
  const [topic, setTopic] = useState("ocean");
  const [seed, setSeed] = useState(() => String(Date.now()));

  const images = useMemo(() => {
    // 6 immagini
    return Array.from({ length: 6 }).map((_, i) => mkUrl(topic, `${seed}-${i}`));
  }, [topic, seed]);

  return (
    <div className="space-y-4">
      <div className="rr-card p-5">
        <div className="text-2xl font-semibold">Immagini</div>
        <div className="mt-1 text-sm text-white/60">
          Scorri, respira, scegli quello che ti fa stare meglio.
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="rounded-2xl bg-black/20 border border-white/10 px-3 py-2 text-sm"
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSeed(String(Date.now()))}
            className="rounded-2xl px-3 py-2 text-sm bg-white/10 hover:bg-white/15 border border-white/15"
          >
            Cambia immagini
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {images.map((src) => (
          <div key={src} className="rr-card overflow-hidden">
            {/* <img> per evitare problemi con next/image domains */}
            <img src={src} alt="Relax" className="h-[280px] w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="text-xs text-white/45">
        Fonte immagini: Unsplash (via source endpoint).
      </div>
    </div>
  );
}
