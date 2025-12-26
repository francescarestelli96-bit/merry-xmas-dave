// lib/themes.ts
export type ThemeId = "alba" | "bosco" | "notte" | "zodiaco";

export type Theme = {
  id: ThemeId;
  name: string;
  description: string;
  bg0: string;
  bg1: string;
  accent: string;
  stars?: boolean; // solo per zodiaco
};

export const THEMES: Theme[] = [
  {
    id: "alba",
    name: "Alba",
    description: "chiaro, morbido, aria nuova",
    bg0: "#f6f7fb",
    bg1: "#e9ecf5",
    accent: "rgba(255,183,77,0.35)", // pesca/oro soft
  },
  {
    id: "bosco",
    name: "Bosco",
    description: "verde scuro, respiro profondo",
    bg0: "#040a08",
    bg1: "#071814",
    accent: "rgba(52,211,153,0.18)",
  },
  {
    id: "notte",
    name: "Notte",
    description: "blu profondo, mente quieta",
    bg0: "#050616",
    bg1: "#0a0f26",
    accent: "rgba(99,102,241,0.20)",
  },
  {
    id: "zodiaco",
    name: "Zodiaco · Cancro",
    description: "blu cosmico, stelle protettive",
    bg0: "#020617",
    bg1: "#050b2e",
    accent: "rgba(56,189,248,0.25)", // azzurro stellare
    stars: true,
  },
];

export const DEFAULT_THEME: ThemeId = "notte";

export function getTheme(id?: string | null): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES.find((t) => t.id === DEFAULT_THEME)!;
}
