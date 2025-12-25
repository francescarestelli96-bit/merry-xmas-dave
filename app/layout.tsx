import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ClientGate from "./ClientGate";
import DiaryDock from "@/components/DiaryDock";

export const metadata: Metadata = {
  title: "Relax Room",
  description: "Una stanza piccola, calma, tua.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-scene="rain">
      <body>
        <ClientGate />
        <div className="rr-shell">
          <div className="rr-container rr-card">
            <Navbar />
            <main className="mt-6">{children}</main>
          </div>
        </div>

        {/* sempre disponibile */}
        <DiaryDock />
      </body>
    </html>
  );
}
