"use client";

export default function AccountingDocs() {
  return (
    <div className="flex gap-8">
      {/* Main article */}
      <article className="prose prose-lg leading-relaxed space-y-8 prose-p:leading-7 prose-slate dark:prose-invert max-w-4xl mx-auto prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-10 prose-table:shadow-sm prose-table:bg-white dark:prose-table:bg-gray-800 prose-pre:bg-gray-800 prose-pre:text-gray-100 rounded-lg">
        <h1>Accounting Module – Overview</h1>

        <p>
          Pico's Accounting module delivers full double-entry bookkeeping that
          integrates seamlessly with every operational feature (sales,
          purchases, inventory, payroll, etc.). Its goal is to let developers
          build business apps without reinventing ledgers while giving
          accountants GAAP-compliant financial statements out of the box.
        </p>

        <h2 id="core-concepts">1. Core Concepts</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Chart of Accounts</strong> – hierarchical account tree grouped by type (Asset, Liability, Equity, Income, Expense).</li>
          <li><strong>Journal Entries</strong> – atomic postings that debit/credit accounts and capture source transaction metadata.</li>
          <li><strong>Fiscal Periods</strong> – open/close windows that lock edits and trigger balance roll-overs.</li>
          <li><strong>Reporting Suite</strong> – live Balance Sheet, P&amp;L, Trial Balance, Cash-Flow, and ageing analyses.</li>
        </ul>

        <h2 id="tech-stack">2. Technical Stack</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Laravel 10</strong> for Eloquent models, policies, and database migrations.</li>
          <li><strong>Livewire v3</strong> for highly interactive CRUD &amp; reporting UIs without heavy SPA boilerplate.</li>
          <li><strong>Blade + AlpineJs + Tailwind CSS</strong> for fast, accessible frontend layouts.</li>
        </ul>

        <h2 id="implementation-layers">3. Implementation Layers</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li><strong>Models</strong> in <code>Accounting/Models</code> define schema, relations &amp; scoped queries.</li>
          <li><strong>Services</strong> in <code>Accounting/Services</code> encapsulate business rules (posting, reversing, exchange-rate translation).</li>
          <li><strong>Livewire Components</strong> under <code>Accounting/Livewire</code> handle UI/UX, validation, and authorization.</li>
          <li><strong>Observers &amp; Triggers</strong> ensure balances stay consistent when entries are created, updated, or voided.</li>
        </ol>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Last updated: 29 Jul 2025</p>
      </article>

      {/* TOC */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2 sticky top-24 self-start text-sm">
        <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
          <p className="font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">On this page</p>
          <ul className="space-y-1">
            <li><a href="#core-concepts" className="hover:text-brand-600 dark:hover:text-brand-400">Core Concepts</a></li>
            <li><a href="#tech-stack" className="hover:text-brand-600 dark:hover:text-brand-400">Technical Stack</a></li>
            <li><a href="#implementation-layers" className="hover:text-brand-600 dark:hover:text-brand-400">Implementation Layers</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
