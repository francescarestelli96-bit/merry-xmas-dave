// PATH: app/xmas/page.tsx
import { Suspense } from "react";
import XmasClient from "./XmasClient";

export const dynamic = "force-dynamic";

export default function XmasPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Carico…</div>}>
      <XmasClient />
    </Suspense>
  );
}
