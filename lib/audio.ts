export type SceneId = "rain" | "ocean" | "asmr" | "soft" | "xmas";

export const SCENES: { id: SceneId; label: string; subtitle: string }[] = [
  { id: "rain", label: "Rain", subtitle: "Pioggia sul vetro" },
  { id: "ocean", label: "Ocean", subtitle: "Onde lente" },
  { id: "asmr", label: "ASMR", subtitle: "Suoni morbidi" },
  { id: "soft", label: "Soft", subtitle: "Fondo caldo" },
  { id: "xmas", label: "Xmas", subtitle: "Atmosfera natalizia" },
];

export const AUDIO_SRC: Record<SceneId, string> = {
  rain: "/audio/rain.mp3",
  ocean: "/audio/ocean.mp3",
  asmr: "/audio/asmr.mp3",
  soft: "/audio/soft.mp3",
  xmas: "/audio/xmas.mp3",
};
