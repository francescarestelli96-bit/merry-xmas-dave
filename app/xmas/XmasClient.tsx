// PATH: app/xmas/XmasClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

// Se ti servono questi import, lasciali. Se danno errore, commentali e deployiamo lo stesso.
import { SPECIAL_MESSAGE } from "@/lib/specialMessage";
import { setScene } from "@/lib/themes";

export default function XmasClient() {
  const sp = useSearchParams();
  const first = sp.get("first");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    // esempio: se vuoi settare scena Xmas quando arrivi qui
    try {
      setScene("xmas" as any);
    } catch {}

    // esempio messaggio speciale
    // (se SPECIAL_MESSAGE non ti serve o ti rompe, commentalo)
    // console.log(SPECIAL_MESSAGE);
  }, []);

  const title = useMemo(() => {
    if (first === "1") return "Buon Natale 🎄";
    return "Natale";
  }, [first]);

  if (!ready) return null;

  // ✅ QUI incolli il tuo contenuto reale della pagina Xmas
  // (pulsanti, testo, animazioni, ecc.)
  return (
    <main className="rr-container">
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>{title}</h1>
      <p style={{ opacity: 0.85, maxWidth: 640 }}>
        Se stai vedendo questo, Vercel non sta più crashando su useSearchParams().
        Ora possiamo rimettere il layout bello senza build che esplode.
      </p>
    </main>
  );
}
