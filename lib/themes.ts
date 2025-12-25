import type { SceneId } from "./audio";

const SCENE_KEY = "rr_scene_v1";

export function setScene(scene: SceneId) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-scene", scene);
  }
  try {
    localStorage.setItem(SCENE_KEY, scene);
  } catch {
    // ignore
  }
}

export function getSavedScene(): SceneId | null {
  try {
    return (localStorage.getItem(SCENE_KEY) as SceneId) || null;
  } catch {
    return null;
  }
}
