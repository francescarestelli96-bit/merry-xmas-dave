"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SPECIAL_MESSAGE } from "@/lib/specialMessage";
import { setScene } from "@/lib/themes";

const XMAS_POP_KEY = "rr_xmas_pop_2025_v1";

export default function XmasPage() {
  const sp = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setScene("xmas");
  }, []);

  useEffect(() => {
    const first = sp.get("first") === "1";
    try {
      const already = localStorage.getItem(XMAS_POP_KEY);
      if (!already && first) {
        localStorage.setItem(XMAS_POP_KEY, "1");
        setOpen(true);
      }
    } catch {
      if (first) setOpen(true);
    }
  }, [sp]);

  return (
    <div className="rr-card p-6">
      <div className="text-2xl font-semibold">Natale</div>
      <div className="mt-2 text-white/70">
        Qui c’è il messaggio. Così come lo vuoi tu.
      </div>

      <div className="mt-5 rr-card p-5">
        <div className="text-xl font-semibold">{SPECIAL_MESSAGE.title}</div>
        <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80 leading-relaxed">
          {SPECIAL_MESSAGE.body}
        </pre>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="mx-auto mt-20 w-[min(720px,92vw)] rr-card p-6">
            <div className="text-3xl font-semibold">🎄 Buon Natale!</div>
            <div className="mt-2 text-white/70">
              Benvenuto nella tua stanza relax. Oggi si rallenta.
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 rounded-2xl px-4 py-2 text-sm font-semibold
                         bg-white/15 hover:bg-white/20 border border-white/20"
            >
              Apri
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
