// components/Gallery.tsx
"use client";

import { useEffect, useState } from "react";

const IMAGE_COUNT = 6;

const KEYWORDS = [
  "calm nature",
  "mist forest",
  "soft light",
  "night sky stars",
  "dream landscape",
  "ocean dusk",
  "moon light",
  "quiet minimal",
];

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function upstreamUrl(seed: number) {
  // Unsplash Source = random by query + sig
  const q = pick(KEYWORDS);
  return `https://source.unsplash.com/1200x900/?${encodeURIComponent(q)}&sig=${seed}`;
}

function proxied(src: string) {
  return `/api/img?src=${encodeURIComponent(src)}`;
}

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);

  const reshuffle = () => {
    const base = Date.now();
    setImages(
      Array.from({ length: IMAGE_COUNT }, (_, i) => proxied(upstreamUrl(base + i)))
    );
  };

  useEffect(() => {
    reshuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="rr-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Gallery</h2>
          <p className="mt-1 text-sm text-white/65">
            Immagini che cambiano. Senza fretta.
          </p>
        </div>

        <button
          type="button"
          onClick={reshuffle}
          className="rr-btn"
          aria-label="Rimescola atmosfera"
        >
          ✨ Rimescola atmosfera
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <img
              src={src}
              alt="Relax visual"
              className="h-full w-full object-cover animate-softFade"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes softFade {
          from {
            opacity: 0;
            filter: blur(6px);
            transform: scale(0.985);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }
        .animate-softFade {
          animation: softFade 0.8s ease;
        }
      `}</style>
    </section>
  );
}
