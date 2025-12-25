"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AUDIO_SRC, SCENES, type SceneId } from "@/lib/audio";
import { getSavedScene, setScene } from "@/lib/themes";

export default function SoundMixer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [scene, setSceneState] = useState<SceneId>("rain");
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.6);

  const src = useMemo(() => AUDIO_SRC[scene], [scene]);

  useEffect(() => {
    const saved = getSavedScene();
    if (saved) {
      setSceneState(saved);
      setScene(saved);
    } else {
      setScene("rain");
    }
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = vol;
  }, [vol]);

  useEffect(() => {
    // when scene changes, keep vibe consistent
    const a = audioRef.current;
    if (!a) return;

    a.src = src;
    a.load();

    if (playing) {
      a.play().catch(() => setPlaying(false));
    }
  }, [src, playing]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;

    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }

    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }

  function pickScene(next: SceneId) {
    setSceneState(next);
    setScene(next);
  }

  return (
    <div className="rr-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="rounded-2xl px-4 py-2 text-sm font-semibold
                       bg-white/10 hover:bg-white/15 border border-white/15"
          >
            {playing ? "⏸ Pausa" : "▶ Play"}
          </button>

          <div className="flex items-center gap-2 text-sm text-white/70">
            <span className="hidden sm:inline">Volume</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={vol}
              onChange={(e) => setVol(parseFloat(e.target.value))}
            />
          </div>

          <div className="text-sm text-white/65">
            Mood: <span className="text-white/90 font-semibold">{scene}</span>
          </div>
        </div>

        <div className="text-xs text-white/55">
          Tip: scegli un suono e lascialo fare il lavoro sporco.
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {SCENES.map((s) => {
          const active = s.id === scene;
          return (
            <button
              key={s.id}
              onClick={() => pickScene(s.id)}
              className={[
                "text-left rounded-2xl p-4 transition",
                "border border-white/10 bg-white/5 hover:bg-white/10",
                active ? "bg-white/15 border-white/20" : "",
              ].join(" ")}
            >
              <div className="text-base font-semibold">{s.label}</div>
              <div className="text-sm text-white/60">{s.subtitle}</div>
            </button>
          );
        })}
      </div>

      <audio ref={audioRef} loop />
    </div>
  );
}
