// app/images/page.tsx
import Gallery from "@/components/Gallery";

export default function ImagesPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="rounded-[28px] bg-white/6 ring-1 ring-white/12 backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Immagini</h1>
            <p className="mt-2 text-sm text-white/65">
              Una gallery calma: blocchi puliti, hover soft, lightbox semplice.
            </p>
          </div>

          <div className="text-xs text-white/55">
            Tip: usa ← → e ESC nel lightbox
          </div>
        </div>

        <div className="mt-6">
          <Gallery />
        </div>
      </div>
    </section>
  );
}
