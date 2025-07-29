"use client";

export default function ReportsDocs() {
  return (
    <div className="flex gap-8">
      {/* Main article */}
      <article className="prose prose-lg leading-relaxed space-y-8 prose-slate dark:prose-invert max-w-4xl mx-auto prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-10 prose-table:shadow-sm prose-table:bg-white dark:prose-table:bg-gray-800 prose-pre:bg-gray-800 prose-pre:text-gray-100 rounded-lg">
        <h1>Reporting Suite </h1>

        <blockquote className="border-l-4 border-yellow-500 bg-blue-50 dark:bg-yellow-700/20 p-4 rounded-md shadow-sm">
          <p>
            The reporting module provides accountants with real-time insights into
            company performance. Each report is a standalone Livewire component
            under <code>Accounting/Livewire/Report</code> and shares a common set of
            filters (fiscal period, branch/location, currency, etc.).
          </p>
        </blockquote>

        <h2 id="livewire-structure">1. Livewire Structure</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <code>Report\Base.php</code> – abstract component that injects filter traits
            and exposes <code>export()</code> helper.
          </li>
          <li>
            Individual reports extend the base and implement <code>query()</code> &amp;
            <code>view()</code> methods.
          </li>
          <li>
            Blade views live in <code>resources/views/report/*</code> and contain a
            responsive table plus summary widgets.
          </li>
        </ul>

        <h2 id="balance-sheet">2. Balance Sheet</h2>
        <p>
          Provides a snapshot of assets, liabilities and equity as of a specific
          date.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>File</strong>: <code>Report/BalanceSheet.php</code></li>
          <li>
            Groups accounts by <code>account_type.category</code> and calculates ending
            balances using <code>ledger_balances</code> view.
          </li>
          <li>
            Supports <code>asAt</code> date filter and multi-currency translation via
            <code>exchange_rate()</code> helper.
          </li>
          <li>
            Export options: PDF portrait, Excel (merged header levels).
          </li>
        </ul>

        <h3 id="bs-query">Key Query Snippet</h3>
        <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto">{`// inside query()
Account::with('type')
  ->selectRaw('type_id, SUM(debit - credit) as balance')
  ->whereDate('posting_date', '<=', $this->asAt)
  ->groupBy('type_id')`}</pre>

        <h2 id="profit-loss">3. Profit & Loss Statement</h2>
        <p>Shows revenues, expenses and net profit over a date range.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>File</strong>: <code>Report/ProfitLoss.php</code></li>
          <li>Filters: <code>startDate</code>, <code>endDate</code>, branch, currency.</li>
          <li>
            Utilises <code>COALESCE(SUM(...),0)</code> to ensure zero values appear for
            empty accounts.
          </li>
          <li>Exports in landscape orientation with comparative columns.</li>
        </ul>

        <h2 id="trial-balance">4. Trial Balance</h2>
        <p>Lists all ledger accounts with opening, movement and closing balances.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>File</strong>: <code>Report/TrialBalance.php</code></li>
          <li>
            Opening balance is derived from prior fiscal periods via
            <code>opening_balance()</code> scope.
          </li>
          <li>Includes debits, credits and running totals columns.</li>
        </ul>

        <h2 id="cash-flow">5. Cash Flow Statement</h2>
        <p>
          Summarises cash inflows and outflows categorised into operating,
          investing and financing activities.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>File</strong>: <code>Report/CashFlow.php</code></li>
          <li>Indirect method – starts from net income then adjusts non-cash items.</li>
          <li>
            Relies on mapping table <code>cash_flow_mappings</code> that links account
            types to sections.
          </li>
        </ul>

        <h2 id="aged-receivables">6. Aged Receivables / Payables</h2>
        <p>
          Breaks down outstanding invoices/bills into ageing buckets (0-30, 31-60,
          61-90, &gt;90 days).
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Receivables</strong>: <code>Report/ARAgeing.php</code></li>
          <li><strong>Payables</strong>: <code>Report/APAgeing.php</code></li>
          <li>Bucket ranges customisable via settings.</li>
        </ul>

        <h2 id="exporting">7. Exporting & Printing</h2>
        <p>
          All report components share the <code>export()</code> method from
          <code>Report\Base</code> which supports:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>PDF</strong> via <code>barryvdh/laravel-dompdf</code></li>
          <li><strong>Excel</strong> via <code>Maatwebsite/Laravel-Excel</code></li>
          <li><strong>CSV</strong> generic fallback</li>
        </ul>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          Last updated: 29 Jul 2025
        </p>
      </article>

      {/* TOC */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2 sticky top-24 self-start text-sm">
        <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
          <p className="font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">On this page</p>
          <ul className="space-y-1">
            <li><a href="#livewire-structure" className="hover:text-brand-600 dark:hover:text-brand-400">Livewire Structure</a></li>
            <li><a href="#balance-sheet" className="hover:text-brand-600 dark:hover:text-brand-400">Balance Sheet</a></li>
            <li className="ml-4"><a href="#bs-query" className="hover:text-brand-600 dark:hover:text-brand-400">— Query Snippet</a></li>
            <li><a href="#profit-loss" className="hover:text-brand-600 dark:hover:text-brand-400">Profit & Loss</a></li>
            <li><a href="#trial-balance" className="hover:text-brand-600 dark:hover:text-brand-400">Trial Balance</a></li>
            <li><a href="#cash-flow" className="hover:text-brand-600 dark:hover:text-brand-400">Cash Flow</a></li>
            <li><a href="#aged-receivables" className="hover:text-brand-600 dark:hover:text-brand-400">Aged AR/AP</a></li>
            <li><a href="#exporting" className="hover:text-brand-600 dark:hover:text-brand-400">Exporting & Printing</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
