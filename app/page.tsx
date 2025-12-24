// PATH: app/page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   CONFIG
========================================================= */

type SceneId = "rain" | "ocean" | "asmr" | "soft" | "xmas";

type Scene = {
  id: SceneId;
  label: string;
  src: string;
  vibe: string;
};

const SCENES: Scene[] = [
  { id: "rain", label: "Rain", src: "/audio/rain.mp3", vibe: "Pioggia sul vetro" },
  { id: "ocean", label: "Ocean", src: "/audio/ocean.mp3", vibe: "Onde lente" },
  { id: "asmr", label: "ASMR", src: "/audio/asmr.mp3", vibe: "Suoni morbidi" },
  { id: "soft", label: "Soft", src: "/audio/soft.mp3", vibe: "Fondo caldo" },
  { id: "xmas", label: "Xmas", src: "/audio/xmas.mp3", vibe: "Atmosfera natalizia" }
];

const SPECIAL_MESSAGE = {
  title: "Messaggio per Davide",
  body: `Ciao amore.

Questa è la tua stanza relax.
Un posto piccolo, calmo, tuo.

Quando il mondo fa rumore,
qui puoi scegliere un suono
e rallentare.

Ti voglio bene.
Sempre.
`
};

/* =========================================================
   UTILS
========================================================= */

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function setSafeVolume(audio: HTMLAudioElement, v: number) {
  audio.volume = clamp01(v);
}

/* =========================================================
   AUDIO MIXER (HTMLAudioElement + crossfade)
========================================================= */

function useAudioMixer() {
  const [sceneId, setSceneId] = useState<SceneId>("rain");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const activeRef = useRef<HTMLAudioElement | null>(null);
  const standbyRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const abortRef = useRef(false);

  const scene = useMemo(
    () => SCENES.find((s) => s.id === sceneId) ?? SCENES[0],
    [sceneId]
  );

  const ensureAudio = useCallback((src: string) => {
    if (!activeRef.current) {
      const a = new Audio(src);
      a.loop = true;
      a.preload = "auto";
      setSafeVolume(a, volume);
      activeRef.current = a;
    }

    if (!standbyRef.current) {
      const b = new Audio(src);
      b.loop = true;
      b.preload = "auto";
      setSafeVolume(b, 0);
      standbyRef.current = b;
    }
  }, [volume]);

  useEffect(() => {
    ensureAudio(scene.src);
    return () => {
      activeRef.current?.pause();
      standbyRef.current?.pause();
    };
  }, [ensureAudio, scene.src]);

  const play = async () => {
    ensureAudio(scene.src);
    try {
      await activeRef.current?.play();
      setIsPlaying(true);
      setNeedsGesture(false);
    } catch {
      setNeedsGesture(true);
    }
  };

  const pause = () => {
    activeRef.current?.pause();
    standbyRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) pause();
    else void play();
  };

  const crossfadeTo = async (nextId: SceneId) => {
    if (nextId === sceneId) return;

    ensureAudio(scene.src);
    if (!activeRef.current || !standbyRef.current) return;

    abortRef.current = true;
    abortRef.current = false;
    setTransitioning(true);

    const next = SCENES.find((s) => s.id === nextId);
    if (!next) return;

    standbyRef.current.src = next.src;
    standbyRef.current.currentTime = 0;
    setSafeVolume(standbyRef.current, 0);

    if (isPlaying) {
      try {
        await standbyRef.current.play();
      } catch {
        setNeedsGesture(true);
        setTransitioning(false);
        return;
      }
    }

    const start = performance.now();
    const duration = 600;

    const step = (t: number) => {
      if (abortRef.current) return;

      const p = Math.min(1, (t - start) / duration);
      setSafeVolume(activeRef.current!, volume * (1 - p));
      setSafeVolume(standbyRef.current!, volume * p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        activeRef.current?.pause();
        const tmp = activeRef.current;
        activeRef.current = standbyRef.current;
        standbyRef.current = tmp;
        setSafeVolume(standbyRef.current!, 0);
        setTransitioning(false);
        setSceneId(nextId);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  return {
    scene,
    scenes: SCENES,
    state: { isPlaying, volume, needsGesture, transitioning },
    actions: {
      toggle,
      setVolume,
      setScene: crossfadeTo
    }
  };
}

/* =========================================================
   UI
========================================================= */

export default function Page() {
  const { scene, scenes, state, actions } = useAudioMixer();
  const [open, setOpen] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-zinc-100">
      <section className="mb-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Stanza relax</h1>
        <p className="mt-2 text-sm text-zinc-300">
          Scegli un suono. Respira. Rallenta.
        </p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold"
          >
            Momento speciale ✨
          </button>
          <button
            onClick={actions.toggle}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm"
          >
            {state.isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {state.needsGesture && (
          <p className="mt-3 text-sm text-amber-300">
            Tocca Play per attivare l’audio
          </p>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {scenes.map((s) => (
          <button
            key={s.id}
            disabled={state.transitioning}
            onClick={() => actions.setScene(s.id)}
            className={`rounded-2xl border p-4 text-left ${
              s.id === scene.id
                ? "border-white/30 bg-white/20"
                : "border-white/10 bg-white/5"
            }`}
          >
            <h3 className="font-semibold">{s.label}</h3>
            <p className="text-xs text-zinc-400">{s.vibe}</p>
          </button>
        ))}
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-w-lg rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold">{SPECIAL_MESSAGE.title}</h2>
            <pre className="mt-4 whitespace-pre-wrap text-sm text-zinc-200">
              {SPECIAL_MESSAGE.body}
            </pre>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 rounded-xl bg-white/15 px-4 py-2 text-sm"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
