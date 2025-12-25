"use client";

import { useEffect } from "react";
import { SPECIAL_MESSAGE } from "@/lib/specialMessage";

export default function XmasClient() {
  useEffect(() => {
    // segna che il Natale è stato visto (se vuoi usarlo)
    localStorage.setItem("rr_xmas_seen", "1");
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl w-full rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold mb-4">
          {SPECIAL_MESSAGE.title}
        </h1>

        <p className="whitespace-pre-line opacity-90 leading-relaxed">
          {SPECIAL_MESSAGE.body}
        </p>
      </div>
    </main>
  );
}
