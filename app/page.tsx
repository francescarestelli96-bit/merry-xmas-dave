"use client";

import SoundMixer from "@/components/SoundMixer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="rr-card p-5">
        <div className="text-2xl font-semibold">Stanza relax</div>
        <div className="mt-1 text-sm text-white/60">
          Quando il mondo fa rumore, qui puoi scegliere un suono e rallentare.
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/images"
            className="rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 border border-white/15"
          >
            Vai alle immagini
          </Link>
          <Link
            href="/xmas"
            className="rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 border border-white/15"
          >
            Apri Natale
          </Link>
        </div>
      </div>

      <SoundMixer />
    </div>
  );
}
