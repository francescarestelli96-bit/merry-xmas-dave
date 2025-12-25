"use client";

import { useMemo, useState } from "react";
import { deleteNote, readNotes, saveNote, type Note } from "@/lib/notes";

export default function DiaryDock() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [ping, setPing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const notes = useMemo(() => {
    if (typeof window === "undefined") return [];
    // refreshKey forces recalculation
    void refreshKey;
    return readNotes();
  }, [refreshKey]);

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  function onSave() {
    if (!canSave) return;
    saveNote({ title: title.trim() || "Senza titolo", body: body.trim() });
    setTitle("");
    setBody("");
    setPing(true);
    setRefreshKey((k) => k + 1);
    window.setTimeout(() => setPing(false), 900);
  }

  function onDelete(n: Note) {
    deleteNote(n.id);
    setRefreshKey((k) => k + 1);
  }

  return (
    <>
      {/* dock button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-2xl px-4 py-3
                   bg-white/10 hover:bg-white/15 border border-white/15
                   backdrop-blur-xl shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <div className="text-left">
            <div className="text-sm font-semibold">Diario</div>
            <div className="text-[11px] text-white/60">Scrivi qui. Anche brutto. Anche poco.</div>
          </div>
        </div>
      </button>

      {/* modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="mx-auto mt-10 w-[min(980px,92vw)] rr-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">Diario</div>
                <div className="text-sm text-white/60">Qui non serve essere bravi. Serve solo esserci.</div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm bg-white/10 hover:bg-white/15 border border-white/15"
              >
                Chiudi
              </button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rr-card p-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titolo (facoltativo)"
                  className="w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm"
                />
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Scrivi…"
                  rows={8}
                  className="mt-2 w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm"
                />

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={onSave}
                    disabled={!canSave}
                    className={[
                      "rounded-xl px-3 py-2 text-sm font-semibold border",
                      canSave ? "bg-white/15 hover:bg-white/20 border-white/20" : "bg-white/5 border-white/10 opacity-40",
                    ].join(" ")}
                  >
                    Salva
                  </button>
                  {ping && <span className="text-xs text-white/70">Salvato ✓</span>}
                </div>
              </div>

              <div className="rr-card p-3">
                <div className="text-sm font-semibold">Appunti</div>
                <div className="mt-2 max-h-[360px] overflow-auto space-y-2 pr-1">
                  {notes.length === 0 ? (
                    <div className="text-sm text-white/60">Niente ancora. Primo pensiero e si parte.</div>
                  ) : (
                    notes.map((n) => (
                      <div key={n.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold">{n.title}</div>
                            <div className="text-xs text-white/55">
                              {new Date(n.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() => onDelete(n)}
                            className="text-xs rounded-lg px-2 py-1 bg-white/10 hover:bg-white/15 border border-white/10"
                          >
                            Elimina
                          </button>
                        </div>
                        <div className="mt-2 whitespace-pre-wrap text-sm text-white/75">{n.body}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-white/50">
              Nota: tutto resta in locale (browser). Niente cloud, niente giudizio.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
