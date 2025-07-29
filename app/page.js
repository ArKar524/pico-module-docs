"use client";

import Link from "next/link";

export default function Home() {
  const modules = [
    { id: "accounting", label: "Accounting", emoji: "💰", desc: "Chart of accounts, journals, reports" },
    { id: "delivery", label: "Delivery", emoji: "📦", desc: "Pick, pack, and ship workflow" },
    { id: "purchase-return", label: "Purchase Return", emoji: "↩️", desc: "Handle supplier returns" },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((m) => (
        <Link
          key={m.id}
          href={`/${m.id}`}
          className="group rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-brand-500 transition-all bg-white dark:bg-[#161b22] flex flex-col"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform select-none">
            {m.emoji}
          </div>
          <h2 className="text-lg font-semibold mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {m.label}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {m.desc}
          </p>
        </Link>
      ))}
    </section>
  );
}
