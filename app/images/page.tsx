// app/images/page.tsx
import Gallery from "@/components/Gallery";

export default function ImagesPage() {
  return (
    <section className="mx-auto mt-6 max-w-5xl">
      <div className="glass card">
        <h1 className="text-2xl font-semibold tracking-tight">Immagini</h1>
        <p className="mt-2 text-sm text-white/70">
          Una gallery “calma”: hover soft, click per lightbox, fine.
        </p>

        <div className="mt-6">
          <Gallery />
        </div>
      </div>
    </section>
  );
}
