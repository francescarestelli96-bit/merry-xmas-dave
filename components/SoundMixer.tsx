// components/SoundMixer.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Scene = {
  id: string;
  name: string;
  description: string;
  // Metti i tuoi file in /public/sounds/*.mp3 (opzionale)
  src: string;
};

const SCENES: Scene[] = [
  { id: "rain", name: "Pioggia", description: "soft rain, zero drama", src: "/sounds/rain.mp3" },
  { id: "ocean", name: "Oceano", description: "onde lente, cervello spento", src: "/sounds/ocean.mp3" },
  { id: "fire", name: "Camino", description: "crepitio caldo, vibe cozy", src: "/sounds/fireplace.mp3" },
  { id: "night", name: "Notte", description: "ambience minimale", src: "/sounds/night.mp3" },
];

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

export default function SoundMixer() {
  const [sceneId, setSceneId] = useState(SCENES[0]?.id ?? "rain");
  const [volume, setVolume] = useState(0.65);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scene = useMemo(
    () => SCENES.find((s) => s.id === sceneId) ?? SCENES[0],
    [sceneId]
  );

  // Sync volume
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = clamp(volume, 0, 1);
  }, [volume]);

  // Change source safely
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const wasPlaying = playing;
    a.pause();
    a.src = scene?.src ?? "";
    a.load();

    if (wasPlaying) {
      // best-effort play (autoplay policies may block)
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }

    try {
      await a.play();
      setPlaying(true);
    } catch {
      // Autoplay blocked: user can retry, but we don't crash.
      setPlaying(false);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="glass card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold tracking-tight">Scene</div>
            <div className="mt-1 text-xs text-white/65">{scene?.description}</div>
          </div>

          <button
            onClick={toggle}
            className="focus-ring rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition ring-1 ring-white/10"
            type="button"
          >
            {playing ? "Pausa" : "Play"}
          </button>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {SCENES.map((s) => {
            const active = s.id === sceneId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSceneId(s.id)}
                className={[
                  "focus-ring text-left rounded-2xl px-4 py-3 transition ring-1",
                  active
                    ? "bg-white/15 ring-white/20"
                    : "bg-white/5 hover:bg-white/10 ring-white/10",
                ].join(" ")}
              >
                <div className="text-sm font-medium">{s.name}</div>
                <div className="mt-1 text-xs text-white/60">{s.description}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight">Volume</div>
            <div className="text-xs text-white/65">{Math.round(volume * 100)}%</div>
          </div>

          <input
            className="mt-3 w-full accent-white"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <div className="mt-2 text-xs text-white/55">
            Tip: se su mobile non parte al primo colpo, premi Play una seconda volta (policy autoplay, classico).
          </div>
        </div>

        <audio ref={audioRef} loop preload="none" />
      </div>
    </div>
  );
}
