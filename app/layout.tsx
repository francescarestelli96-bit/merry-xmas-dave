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
      <body className="min-h-dvh">
        {/* Background overlay MUST NOT capture clicks */}
        <div className="app-bg pointer-events-none" aria-hidden="true" />

        {/* App content sits above */}
        <div className="relative z-10 min-h-dvh">
          <Navbar />
          <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6 sm:px-6">
            {children}
          </main>
          <DiaryDock />
        </div>
      </body>
    </html>
  );
}
