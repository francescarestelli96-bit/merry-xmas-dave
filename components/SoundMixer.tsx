// components/SoundMixer.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_THEME, getTheme, THEMES, type ThemeId } from "@/lib/themes";

type SceneId = "rain" | "ocean" | "asmr" | "soft" | "xmas";
type Scene = { id: SceneId; name: string; vibe: string; src: string };

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

export default function SoundMixer() {
  const [sceneId, setSceneId] = useState<SceneId>("rain");
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);
  const [volume, setVolume] = useState(0.8);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState<string>("");

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

  // apply theme vars
useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty("--bg0", theme.bg0);
  root.style.setProperty("--bg1", theme.bg1);
  root.style.setProperty("--accent", theme.accent);
  root.setAttribute("data-theme", theme.id);

  try {
    localStorage.setItem("rr_theme_v1", theme.id);
  } catch {}
}, [theme]);


  // init audio
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

  // scene change
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const wasPlaying = playing;
    setHint("");

    a.pause();
    a.src = scene.src;
    a.load();

    if (wasPlaying && enabled) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {
          setPlaying(false);
          setHint("Audio bloccato dal browser: clicca “Abilita audio”, poi Play.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  const enableAudio = async () => {
    const a = audioRef.current;
    if (!a) return;
    setHint("");

    try {
      await a.play(); // user gesture unlock
      a.pause();
      a.currentTime = 0;
      setEnabled(true);
      setHint("Audio abilitato ✅");
    } catch {
      setEnabled(false);
      setHint("Non riesco a sbloccare l’audio qui. Riprova e poi premi Play.");
    }
  };

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (!enabled) {
      setHint("Prima: “Abilita audio”. È la policy dei browser, non sei tu.");
      return;
    }

    setHint("");

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
      setHint("Play fallito. (Se sei su mobile: tap → Abilita audio → Play).");
    }
  };

  const stop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
    setHint("");
  };

  return (
    <section className="rr-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="rr-badge">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
            <span>sound • themes • chill</span>
          </div>

          <div className="text-xl sm:text-2xl font-semibold tracking-tight">
            {scene.name}
          </div>
          <div className="text-sm text-white/70">{scene.vibe}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={enableAudio} className="rr-btn" aria-pressed={enabled}>
            🔊 {enabled ? "Audio ok" : "Abilita audio"}
          </button>

          <button type="button" onClick={togglePlay} className="rr-btn rr-btn-primary">
            {playing ? "⏸ Pausa" : "▶︎ Play"}
          </button>

          <button type="button" onClick={stop} className="rr-btn">
            ⟲ Stop
          </button>
        </div>
      </div>

      {hint && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/75">
          {hint}
        </div>
      )}

      {/* Themes */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Theme</div>
            <div className="mt-1 text-xs text-white/60">{theme.description}</div>
          </div>
          <div className="text-xs text-white/55">attivo: <span className="text-white/80">{theme.name}</span></div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {THEMES.map((t) => {
            const active = t.id === themeId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeId(t.id)}
                className={[
                  "rounded-3xl p-3 text-left border transition",
                  active ? "bg-white/12 border-white/18" : "bg-white/5 border-white/10 hover:bg-white/8",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <span className={active ? "text-[11px] text-emerald-300/80" : "text-[11px] text-white/45"}>
                    {active ? "attivo" : "usa"}
                  </span>
                </div>

                <div className="mt-1 text-xs text-white/60">{t.description}</div>

                <div className="mt-3 h-8 w-full rounded-2xl border border-white/10"
                  style={{
                    background: `radial-gradient(120px 60px at 25% 30%, ${t.accent}, transparent 65%), linear-gradient(180deg, ${t.bg0}, ${t.bg1})`,
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Scene grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {SCENES.map((s) => {
          const active = s.id === sceneId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSceneId(s.id)}
              className={[
                "rounded-3xl p-4 text-left border transition",
                active ? "bg-white/12 border-white/18" : "bg-white/5 border-white/10 hover:bg-white/8",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">{s.name}</div>
                <span className={active ? "text-xs text-emerald-300/80" : "text-xs text-white/45"}>
                  {active ? "attiva" : "seleziona"}
                </span>
              </div>
              <div className="mt-1 text-xs text-white/60">{s.vibe}</div>
            </button>
          );
        })}
      </div>

      {/* Volume */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Volume</div>
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
            Mobile: tap → <span className="text-white/80">Abilita audio</span> → Play. Sempre.
          </div>
        </div>
      </div>

      <audio ref={audioRef} playsInline />
    </section>
  );
}
