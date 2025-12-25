// components/SoundMixer.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Scene = {
  id: string;
  name: string;
  vibe: string;
  src: string;
};

const SCENES: Scene[] = [
  { id: "rain", name: "Pioggia", vibe: "soft rain, cervello spento", src: "/sounds/rain.mp3" },
  { id: "ocean", name: "Oceano", vibe: "onde lente, respiro lungo", src: "/sounds/ocean.mp3" },
  { id: "fire", name: "Camino", vibe: "cozy crackle, caldo", src: "/sounds/fireplace.mp3" },
  { id: "night", name: "Notte", vibe: "ambience minimale", src: "/sounds/night.mp3" },
];

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
      {children}
    </span>
  );
}

export default function SoundMixer() {
  const [sceneId, setSceneId] = useState(SCENES[0]?.id ?? "rain");
  const [volume, setVolume] = useState(0.7);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scene = useMemo(() => SCENES.find((s) => s.id === sceneId) ?? SCENES[0], [sceneId]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = clamp(volume, 0, 1);
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const was = playing;
    a.pause();
    a.src = scene?.src ?? "";
    a.load();

    if (was) {
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
      setPlaying(false);
    }
  };

  return (
    <div className="rounded-[28px] bg-white/6 ring-1 ring-white/12 backdrop-blur-xl p-5 sm:p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-semibold tracking-tight">Scene</div>
          <div className="mt-1 text-sm text-white/70">{scene?.vibe}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill>loop</Pill>
            <Pill>soft UI</Pill>
            <Pill>no drama</Pill>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/18 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
          >
            {playing ? "⏸ Pausa" : "▶︎ Play"}
          </button>

          <button
            type="button"
            onClick={() => { setPlaying(false); audioRef.current?.pause(); }}
            className="inline-flex items-center justify-center rounded-2xl bg-white/6 px-4 py-3 text-sm font-semibold text-white/80 ring-1 ring-white/12 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
          >
            ⟲ Stop
          </button>
        </div>
      </div>

      {/* scene grid */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {SCENES.map((s) => {
          const active = s.id === sceneId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSceneId(s.id)}
              className={[
                "text-left rounded-3xl p-4 ring-1 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60",
                active
                  ? "bg-white/14 ring-white/18 shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
                  : "bg-white/5 ring-white/10 hover:bg-white/8",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold tracking-tight">{s.name}</div>
                <span className={active ? "text-xs text-emerald-300/80" : "text-xs text-white/45"}>
                  {active ? "attiva" : "seleziona"}
                </span>
              </div>
              <div className="mt-1 text-xs text-white/60">{s.vibe}</div>
            </button>
          );
        })}
      </div>

      {/* volume */}
      <div className="mt-5 rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold tracking-tight">Volume</div>
          <div className="text-xs text-white/60">{Math.round(volume * 100)}%</div>
        </div>

        <div className="mt-3">
          <input
            className="w-full accent-white"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <div className="mt-2 text-xs text-white/55">
            Se su mobile non parte al primo click: ripremi Play (autoplay policy, classico).
          </div>
        </div>
      </div>

      <audio ref={audioRef} loop preload="none" />
    </div>
  );
}
