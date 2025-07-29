import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Pico Developer Docs",
  description: "Choose a module to explore detailed developer documentation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-200">
        <header className="w-full sticky top-0 z-50 backdrop-blur border-b border-gray-200/80 dark:border-gray-700/60 bg-white/75 dark:bg-[#0d1117]/75 supports-[backdrop-filter]:bg-white/60 py-4 mb-8">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">📖 Pico Docs</Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">v1.0.0</span>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 pb-16">{children}</main>
      </body>
    </html>
  );
}
