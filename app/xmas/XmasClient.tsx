"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SPECIAL_MESSAGE } from "@/lib/specialMessage";
import { setScene } from "@/lib/themes";

export default function XmasClient() {
  const sp = useSearchParams();
  const first = sp.get("first");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setScene("xmas" as any);
    } catch {}
  }, []);

  const title = useMemo(() => {
    return first === "1" ? "Buon Natale 🎄" : "Natale";
  }, [first]);

  if (!mounted) return null;

  return (
    <main className="rr-container">
      <h1 className="text-3xl font-semibold mb-3">{title}</h1>
    <p className="opacity-90 max-w-xl">
  {typeof SPECIAL_MESSAGE === "string"
    ? SPECIAL_MESSAGE
    : SPECIAL_MESSAGE?.body ?? "💛"}
</p>

    </main>
  );
}
