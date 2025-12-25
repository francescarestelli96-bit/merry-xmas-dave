// components/DiaryPanel.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Note = { id: string; createdAt: number; text: string };

const STORAGE_KEY = "relax_room_notes_v1";
const MAX_LEN = 500;

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
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
}

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DiaryPanel({ compact = false }: { compact?: boolean }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => setNotes(loadNotes()), []);

  const trimmed = useMemo(() => draft.trim(), [draft]);
  const canSave = useMemo(() => trimmed.length >= 2, [trimmed]);
  const remaining = useMemo(() => MAX_LEN - draft.length, [draft.length]);

  const add = () => {
    if (!canSave) return;
    const n: Note = { id: uid(), createdAt: Date.now(), text: trimmed };
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
    setNotes([]);
    saveNotes([]);
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-[28px] bg-white/6 ring-1 ring-white/12 backdrop-blur-xl p-5 sm:p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
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
              className="rounded-2xl bg-white/6 px-3 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              Svuota
            </button>
          )}
        </div>

        <div className="mt-4 rounded-3xl bg-black/25 ring-1 ring-white/10 overflow-hidden">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_LEN))}
            rows={compact ? 4 : 6}
            placeholder="Scrivi qui… (anche solo una frase)"
            className="w-full resize-none bg-transparent px-4 py-4 text-sm leading-relaxed text-white placeholder:text-white/35 focus:outline-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-4">
            <div className="text-xs text-white/55">
              {draft.length}/{MAX_LEN} •{" "}
              <span className={remaining < 40 ? "text-amber-300/80" : ""}>
                {remaining} rimasti
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDraft("")}
                className="rounded-2xl bg-white/6 px-3 py-2 text-xs font-semibold text-white/70 ring-1 ring-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              >
                Pulisci
              </button>

              <button
                type="button"
                onClick={add}
                disabled={!canSave}
                className={[
                  "rounded-2xl px-4 py-2 text-sm font-semibold ring-1 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60",
                  canSave
                    ? "bg-white/12 ring-white/15 hover:bg-white/18 text-white"
                    : "bg-white/5 ring-white/10 text-white/40 cursor-not-allowed",
                ].join(" ")}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {notes.length === 0 ? (
          <div className="rounded-[28px] bg-white/5 ring-1 ring-white/10 p-5 text-sm text-white/70">
            Nessuna nota ancora. Inizia easy: una frase, due parole, anche solo “oggi respiro”.
          </div>
        ) : (
          notes.map((n) => (
            <div
              key={n.id}
              className="rounded-[28px] bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/6 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs text-white/55">{formatDate(n.createdAt)}</div>
                <button
                  type="button"
                  onClick={() => remove(n.id)}
                  className="rounded-2xl bg-white/6 px-3 py-2 text-xs font-semibold text-white/70 ring-1 ring-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
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
