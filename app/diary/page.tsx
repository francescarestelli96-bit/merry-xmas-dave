// app/diary/page.tsx
import DiaryPanel from "@/components/DiaryPanel";

export default function DiaryPage() {
  return (
    <section className="mx-auto mt-6 max-w-3xl">
      <div className="glass card">
        <h1 className="text-2xl font-semibold tracking-tight">Diario</h1>
        <p className="mt-2 text-sm text-white/70">
          Stesso editor del dock, ma in versione “full”. Coerenza, zero doppioni.
        </p>

        <div className="mt-6">
          <DiaryPanel />
        </div>
      </div>
    </section>
  );
}
