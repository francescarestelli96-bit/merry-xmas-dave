export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
};

const NOTES_KEY = "rr_notes_v1";

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

export function readNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeNotes(notes: Note[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function saveNote(input: { title: string; body: string }) {
  const notes = readNotes();
  const now = Date.now();

  const note: Note = {
    id: uid(),
    title: input.title || "Senza titolo",
    body: input.body || "",
    createdAt: now,
    updatedAt: now,
  };

  writeNotes([note, ...notes]);
  return note;
}

export function deleteNote(id: string) {
  const notes = readNotes().filter((n) => n.id !== id);
  writeNotes(notes);
}
