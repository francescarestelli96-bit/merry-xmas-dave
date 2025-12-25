// components/DiaryPanel.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Note = {
  id: string;
  createdAt: number;
  text: string;
};

const STORAGE_KEY = "relax_room_notes_v1";

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((n) => n && typeof n.id === "string" && typeof n.text === "string")
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore
  }
}

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

export default function DiaryPanel({ compact = false }: { compact?: boolean }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => setNotes(loadNotes()), []);

  const canSave = useMemo(() => draft.trim().length >= 2, [draft]);

  const add = () => {
    if (!canSave) return;
    const n: Note = { id: uid(), createdAt: Date.now(), text: draft.trim() };
    const next = [n, ...notes];
    setNotes(next);
    saveNotes(next);
    setDraft("");
  };

  const remove = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    saveNotes(next);
  };

  const clearAll = () => {
    const next: Note[] = [];
    setNotes(next);
    saveNotes(next);
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold tracking-tight">Diario</div>
            <div className="mt-1 text-xs text-white/60">
              Note veloci. Zero perfezionismo. Zero giudizio.
            </div>
          </div>
          {!compact && (
            <button
              type="button"
              onClick={clearAll}
              className="focus-ring rounded-xl px-3 py-2 text-xs text-white/70 hover:bg-white/10 transition ring-1 ring-white/10"
              title="Svuota"
            >
              Svuota
            </button>
          )}
        </div>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={compact ? 3 : 4}
          placeholder="Scrivi qui…"
          className="mt-3 w-full resize-none rounded-2xl bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-xs text-white/50">
            {draft.trim().length}/500
          </div>
          <button
            type="button"
            onClick={add}
            disabled={!canSave}
            className={[
              "focus-ring rounded-xl px-4 py-2 text-sm font-medium transition ring-1",
              canSave
                ? "bg-white/12 hover:bg-white/18 ring-white/15"
                : "bg-white/5 ring-white/10 text-white/40 cursor-not-allowed",
            ].join(" ")}
          >
            Salva
          </button>
        </div>
      </div>

      <div className="grid gap-2">
        {notes.length === 0 ? (
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-white/65">
            Nessuna nota ancora. Iniziamo easy: una frase, due parole, anche solo “oggi respiro”.
          </div>
        ) : (
          notes.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs text-white/55">
                  {new Date(n.createdAt).toLocaleString("it-IT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => remove(n.id)}
                  className="focus-ring rounded-xl px-3 py-1 text-xs text-white/65 hover:bg-white/10 transition"
                  title="Elimina"
                >
                  Elimina
                </button>
              </div>
              <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/85">
                {n.text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
