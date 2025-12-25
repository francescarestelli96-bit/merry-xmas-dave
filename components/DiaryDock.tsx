// components/DiaryDock.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import DiaryPanel from "@/components/DiaryPanel";

export default function DiaryDock() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Focus trap minimale: porta focus sul modal
    dialogRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring fixed bottom-5 right-5 z-[60] rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold tracking-tight text-white ring-1 ring-white/15 hover:bg-white/18 transition shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        📝 Diario
      </button>

      {open && (
        <div className="fixed inset-0 z-[70]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
            <div
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              className="glass w-full max-w-xl rounded-3xl p-4 sm:p-5 outline-none"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold tracking-tight">Quick diary</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition"
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
