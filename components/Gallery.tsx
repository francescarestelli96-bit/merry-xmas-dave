// components/Gallery.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Img = { src: string; alt: string };

const IMAGES: Img[] = [
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80", alt: "Forest mist" },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80", alt: "Mountains sunrise" },
  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=80", alt: "Calm lake" },
  { src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80", alt: "Ocean" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80", alt: "Night sky" },
  { src: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1800&q=80", alt: "Desk vibe" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80", alt: "Forest path" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80", alt: "Alpine road" },
  { src: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1800&q=80", alt: "Cozy coffee" },
  { src: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1800&q=80", alt: "City lights" },
  { src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1800&q=80", alt: "Warm lights" },
  { src: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1800&q=80", alt: "Clouds" },
];

export default function Gallery() {
  const images = useMemo(() => IMAGES, []);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? null : (i + images.length - 1) % images.length));
      if (e.key === "ArrowRight") setActive((i) => (i === null ? null : (i + 1) % images.length));
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, images.length]);

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
            className="group relative overflow-hidden rounded-[28px] bg-white/6 ring-1 ring-white/12 hover:bg-white/8 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            title="Apri"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-56 w-full object-cover opacity-95 transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 transition group-hover:opacity-100">
              <span className="text-xs text-white/90">{img.alt}</span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70 ring-1 ring-white/10">
                view
              </span>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[90]">
          <button
            type="button"
            aria-label="Chiudi"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl rounded-[28px] bg-white/7 ring-1 ring-white/12 backdrop-blur-xl p-3 sm:p-4 shadow-[0_30px_140px_rgba(0,0,0,0.75)]">
              <div className="flex items-center justify-between gap-2 px-2 py-2">
                <div className="text-xs text-white/75">{images[active]?.alt}</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-2xl bg-white/6 px-3 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-2xl bg-white/6 px-3 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-2xl bg-white/12 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/18 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
                  >
                    Chiudi
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[22px] ring-1 ring-white/10 bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[active]?.src}
                  alt={images[active]?.alt}
                  className="max-h-[78vh] w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
