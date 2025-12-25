"use client";

import DiaryDock from "@/components/DiaryDock";

export default function DiaryPage() {
  return (
    <div className="rr-card p-5">
      <div className="text-xl font-semibold">Diario</div>
      <div className="mt-1 text-sm text-white/60">
        Se ti va, apri il diario dal pulsante in basso a destra.
      </div>

      <div className="mt-4 text-sm text-white/70">
        Piccolo trucco: scrivi 3 righe, non un romanzo.
      </div>

      {/* il dock c'è già nel layout, qui lo richiamiamo solo per chiarezza visiva se vuoi */}
      <div className="mt-6 opacity-70 text-sm">
        Il dock è sempre lì 👉 in basso a destra.
      </div>

      <div className="mt-2 text-xs text-white/50">
        (Sì, è voluto: “sempre disponibile” = non devi cercarlo.)
      </div>
    </div>
  );
}
