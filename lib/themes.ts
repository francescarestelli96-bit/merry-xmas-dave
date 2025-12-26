// lib/themes.ts
export type ThemeId = "alba" | "bosco" | "notte" | "zodiaco";

export type Theme = {
  id: ThemeId;
  name: string;
  description: string;
  bg0: string;
  bg1: string;
  accent: string; // glow color
};

export const THEMES: Theme[] = [
  {
    id: "alba",
    name: "Alba",
    description: "luce morbida, ripartenza gentile",
    bg0: "#070514",
    bg1: "#0b1630",
    accent: "rgba(253,164,175,0.22)",
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
    name: "Zodiaco",
    description: "cosmico, viola, stellare",
    bg0: "#070515",
    bg1: "#140a25",
    accent: "rgba(167,139,250,0.20)",
  },
];

export const DEFAULT_THEME: ThemeId = "notte";

export function getTheme(id?: string | null): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES.find((t) => t.id === DEFAULT_THEME)!;
}
