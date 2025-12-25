// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DiaryDock from "@/components/DiaryDock";

export const metadata: Metadata = {
  title: "Relax Room",
  description: "A soft, dreamy relax room — merry xmas, Dave.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body>
        {/* Background */}
        <div className="app-bg" aria-hidden="true" />

        <div className="relative min-h-dvh">
          <Navbar />
          <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6 sm:px-6">
            {children}
          </main>

          {/* Dock globale */}
          <DiaryDock />
        </div>
      </body>
    </html>
  );
}
