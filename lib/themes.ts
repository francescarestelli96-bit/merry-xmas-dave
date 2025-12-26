// lib/themes.ts
export type ThemeId = "alba" | "bosco" | "notte" | "zodiaco";

export type Theme = {
  id: ThemeId;
  name: string;
  description: string;
  bg0: string;
  bg1: string;
  accent: string; // usato come glow
  text: string;   // ✅ colore testo globale per il tema
};

export const THEMES: Theme[] = [
  {
    id: "alba",
    name: "Alba",
    description: "chiaro, morbido, aria nuova",
    bg0: "#f8fafc",               // slate-50-ish
    bg1: "#e2e8f0",               // slate-200-ish
    accent: "rgba(56,189,248,0.35)", // cyan glow soft
    text: "rgba(2,6,23,0.90)",    // ✅ testo scuro automatico
  },
  {
    id: "bosco",
    name: "Bosco",
    description: "verde profondo, calma umida",
    bg0: "#071a14",
    bg1: "#04140f",
    accent: "rgba(16,185,129,0.20)",
    text: "rgba(255,255,255,0.92)",
  },
  {
    id: "notte",
    name: "Notte",
    description: "dark dreamy, focus",
    bg0: "#050615",
    bg1: "#070b18",
    accent: "rgba(99,102,241,0.25)",
    text: "rgba(255,255,255,0.92)",
  },
  {
    id: "zodiaco",
    name: "Zodiaco",
    description: "blu notte, stelle e costellazioni",
    bg0: "#020617",               // slate-950
    bg1: "#020b2a",               // deep blue
    accent: "rgba(56,189,248,0.18)", // icy starlight
    text: "rgba(255,255,255,0.92)",
  },
];

export const DEFAULT_THEME: ThemeId = "notte";

export function getTheme(id: ThemeId) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
