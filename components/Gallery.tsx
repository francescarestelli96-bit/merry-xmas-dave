// components/Gallery.tsx
"use client";

import { useMemo, useState } from "react";

type Img = { src: string; alt: string };

const IMAGES: Img[] = [
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    alt: "Forest mist",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    alt: "Mountains sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80",
    alt: "Calm lake",
  },
  {
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    alt: "Ocean",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    alt: "Alpine road",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    alt: "Night sky",
  },
  {
    src: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1400&q=80",
    alt: "Soft city lights",
  },
  {
    src: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1400&q=80",
    alt: "Cozy coffee",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    alt: "Forest path",
  },
  {
    src: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=80",
    alt: "Desk vibes",
  },
  {
    src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=80",
    alt: "Warm lights",
  },
  {
    src: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1400&q=80",
    alt: "Clouds",
  },
];

export default function Gallery() {
  const images = useMemo(() => IMAGES, []);
  const [active, setActive] = useState<number | null>(null);

  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? null : (i + images.length - 1) % images.length));
  const next = () => setActive((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(idx)}
            className="focus-ring group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10"
            title="Apri"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03] opacity-95"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 text-left text-xs text-white/85 opacity-0 transition group-hover:opacity-100">
              {img.alt}
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={close} />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="glass w-full max-w-4xl rounded-3xl p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 px-2 py-2">
                <div className="text-xs text-white/70">{images[active]?.alt}</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="focus-ring rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 transition"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="focus-ring rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 transition"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="focus-ring rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 transition"
                  >
                    Chiudi
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[active]?.src}
                  alt={images[active]?.alt}
                  className="max-h-[75vh] w-full object-contain bg-black/30"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
