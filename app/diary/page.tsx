// app/diary/page.tsx
import DiaryPanel from "@/components/DiaryPanel";

export default function DiaryPage() {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="rounded-[28px] bg-white/6 ring-1 ring-white/12 backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Diario</h1>
        <p className="mt-2 text-sm text-white/65">
          Stesso editor del dock, ma in versione “full”. Coerenza totale.
        </p>

        <div className="mt-6">
          <DiaryPanel />
        </div>
      </div>
    </section>
  );
}
