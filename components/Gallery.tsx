"use client";

import { useState } from "react";

const IMAGES = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Gallery() {
  const [images, setImages] = useState(() => shuffle(IMAGES));
  const [seed, setSeed] = useState(0); // forza re-render poetico

  const refresh = () => {
    setImages(shuffle(IMAGES));
    setSeed((s) => s + 1);
  };

  return (
    <section className="rr-card p-5 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Gallery</div>
          <div className="text-xs text-white/60">
            immagini che cambiano, senza fretta
          </div>
        </div>

        <button
          onClick={refresh}
          className="rr-btn"
          aria-label="Rimescola atmosfera"
        >
          ✨ Rimescola atmosfera
        </button>
      </div>

      {/* Grid */}
      <div
        key={seed}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-softFade"
      >
        {images.slice(0, 6).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover shadow-lg"
          />
        ))}
      </div>

      {/* Animazione poetica inline (self-contained) */}
      <style jsx>{`
        @keyframes softFade {
          from {
            opacity: 0;
            transform: scale(0.985);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        .animate-softFade {
          animation: softFade 0.6s ease;
        }
      `}</style>
    </section>
  );
}
