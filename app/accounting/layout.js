"use client";

import Link from "next/link";

export default function AccountingLayout({ children }) {
  const links = [
    ["/accounting/account-types", "Account Types"],
    ["/accounting/accounts", "Accounts"],
    ["/accounting/fiscal-periods", "Fiscal Periods"],
    ["/accounting/transactions", "Transactions"],
    ["/accounting/journal-entries", "Journal Entries"],
    ["/accounting/reports", "Reports"],
  ];

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <aside className="hidden md:block w-60 shrink-0 border-r border-gray-200 dark:border-gray-700 py-4 sticky top-20 self-start">
        <nav className="px-4 text-sm space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Accounting Features
            </div>
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="block py-1.5 pl-3 rounded text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-gray-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <section className="flex-1 min-w-0">{children}</section>
    </div>
  );
}
