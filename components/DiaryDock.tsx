// components/DiaryDock.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import DiaryPanel from "@/components/DiaryPanel";

export default function DiaryDock() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    setTimeout(() => panelRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[60] rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/18 transition shadow-[0_20px_80px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
      >
        📝 Diario
      </button>

      {open && (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Chiudi"
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
            <div
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              className="w-full max-w-2xl rounded-[28px] bg-white/7 ring-1 ring-white/12 backdrop-blur-xl p-4 sm:p-5 outline-none shadow-[0_30px_140px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between gap-3 px-1">
                <div className="text-sm font-semibold tracking-tight">Quick diary</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl bg-white/6 px-3 py-2 text-sm font-semibold text-white/75 ring-1 ring-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
                >
                  Chiudi
                </button>
              </div>

              <div className="mt-4">
                <DiaryPanel compact />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
