// components/SoundMixer.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_THEME, getTheme, THEMES, type ThemeId } from "@/lib/themes";

type SceneId = "rain" | "ocean" | "asmr" | "soft" | "xmas";

type Scene = {
  id: SceneId;
  name: string;
  vibe: string;
  src: string;
};

const SCENES: Scene[] = [
  { id: "rain", name: "Pioggia", vibe: "lavaggio mentale, calma", src: "/audio/rain.mp3" },
  { id: "ocean", name: "Oceano", vibe: "onde lente, respiro lungo", src: "/audio/ocean.mp3" },
  { id: "asmr", name: "ASMR", vibe: "micro suoni, focus dolce", src: "/audio/asmr.mp3" },
  { id: "soft", name: "Soft", vibe: "ambience minimale, leggero", src: "/audio/soft.mp3" },
  { id: "xmas", name: "Xmas", vibe: "special moment", src: "/audio/xmas.mp3" },
];

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function pill(active = false) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ring-1 transition",
    "focus:outline-none focus:ring-2 focus:ring-indigo-400/60",
    active
      ? "bg-white/12 ring-white/15 hover:bg-white/18 text-white"
      : "bg-white/6 ring-white/12 hover:bg-white/10 text-white/85",
  ].join(" ");
}

export default function SoundMixer() {
  const [sceneId, setSceneId] = useState<SceneId>("rain");
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);
  const [volume, setVolume] = useState(0.75);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false); // <-- unlock audio
  const [status, setStatus] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scene = useMemo(() => SCENES.find((s) => s.id === sceneId) ?? SCENES[0], [sceneId]);
  const theme = useMemo(() => getTheme(themeId), [themeId]);

  // restore theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rr_theme_v1");
      if (saved) setThemeId(saved as ThemeId);
    } catch {}
  }, []);

  // apply theme -> CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg0", theme.bg0);
    root.style.setProperty("--bg1", theme.bg1);
    root.style.setProperty("--accent", theme.accent);
    try {
      localStorage.setItem("rr_theme_v1", theme.id);
    } catch {}
  }, [theme]);

  // init audio element
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.preload = "metadata";
    a.volume = clamp(volume, 0, 1);
    a.src = scene.src;
    a.load();
  }, []);

  // volume
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = clamp(volume, 0, 1);
  }, [volume]);

  // change scene: keep playing if already playing
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const wasPlaying = playing;
    setStatus("");

    a.pause();
    a.src = scene.src;
    a.load();

    if (wasPlaying && enabled) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {
          setPlaying(false);
          setStatus("Audio bloccato: premi prima “Abilita audio”, poi Play.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  const enableAudio = async () => {
    const a = audioRef.current;
    if (!a) return;

    // IMPORTANT: must be triggered by user gesture
    setStatus("");
    try {
      // tiny play-pause to unlock
      await a.play();
      a.pause();
      a.currentTime = 0;
      setEnabled(true);
      setStatus("Audio abilitato ✅");
    } catch {
      setEnabled(false);
      setStatus("Non riesco ad abilitare l’audio qui. Prova a cliccare Play una volta, poi di nuovo.");
    }
  };

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    setStatus("");

    if (!enabled) {
      setStatus("Prima: clicca “Abilita audio” (serve per i browser).");
      return;
    }

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
      setStatus("Play fallito. Controlla volume e che il file esista: " + scene.src);
    }
  };

  const stop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
    setStatus("");
  };

  return (
    <div className="relative rounded-[28px] bg-white/6 ring-1 ring-white/12 backdrop-blur-xl p-5 sm:p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div>
            <div className="text-sm font-semibold tracking-tight">Scene</div>
            <div className="mt-1 text-sm text-white/70">{scene.vibe}</div>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-tight">Theme</div>
            <div className="mt-1 text-sm text-white/70">{theme.description}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={enableAudio} className={pill(!enabled)}>
            🔊 Abilita audio
          </button>
          <button type="button" onClick={togglePlay} className={pill(true)}>
            {playing ? "⏸ Pausa" : "▶︎ Play"}
          </button>
          <button type="button" onClick={stop} className={pill(false)}>
            ⟲ Stop
          </button>
        </div>
      </div>

      {/* theme selector */}
      <div className="mt-5 rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
        <div className="text-sm font-semibold tracking-tight">Scegli theme</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {THEMES.map((t) => {
            const active = t.id === themeId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeId(t.id)}
                className={[
                  "rounded-3xl p-3 text-left ring-1 transition",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-400/60",
                  active ? "bg-white/14 ring-white/18" : "bg-white/5 ring-white/10 hover:bg-white/8",
                ].join(" ")}
              >
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="mt-1 text-xs text-white/60">{t.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* scene selector */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {SCENES.map((s) => {
          const active = s.id === sceneId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSceneId(s.id)}
              className={[
                "text-left rounded-3xl p-4 ring-1 transition",
                "focus:outline-none focus:ring-2 focus:ring-indigo-400/60",
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
            Se senti “niente”: premi prima <span className="text-white/80">Abilita audio</span>, poi Play.
          </div>

          {status && (
            <div className="mt-3 rounded-2xl bg-white/6 ring-1 ring-white/10 p-3 text-xs text-white/75">
              {status}
            </div>
          )}
        </div>
      </div>

      <audio ref={audioRef} playsInline />
    </div>
  );
}
