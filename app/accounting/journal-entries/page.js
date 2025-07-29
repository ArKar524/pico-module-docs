"use client";

export default function JournalEntriesDocs() {
  return (
    <div className="flex gap-8">
      {/* Main article */}
      <article className="prose prose-lg leading-relaxed space-y-8 prose-slate dark:prose-invert max-w-4xl mx-auto prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-10 prose-table:shadow-sm prose-table:bg-white dark:prose-table:bg-gray-800 prose-pre:bg-gray-800 prose-pre:text-gray-100 rounded-lg">
        <h1>Journal Entry</h1>

        <blockquote className="border-l-4 border-yellow-500 bg-blue-50 dark:bg-yellow-700/20 p-4 rounded-md shadow-sm">
          <p>This module records finalized financial events by debiting and crediting account balances. Entries may originate manually or from un-posted transactions (sales, payments, etc.).</p>
        </blockquote>

        <h2 id="database-schema">1. Database Schema</h2>
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="border p-2 text-left">Column</th>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">id</td><td className="border p-2">BIGINT</td><td className="border p-2">Primary key</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">journal_code</td><td className="border p-2">VARCHAR(30)</td><td className="border p-2">Human-friendly code (e.g. JE-2025-0001)</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">entry_date</td><td className="border p-2">DATE</td><td className="border p-2">Posting date</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">fiscal_period_id</td><td className="border p-2">BIGINT (FK)</td><td className="border p-2">Links to fiscal_periods.id</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">transaction_source</td><td className="border p-2">ENUM</td><td className="border p-2">sale / purchase / payment / … / manual</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">is_post</td><td className="border p-2">BOOLEAN</td><td className="border p-2">Whether totals affect ledger balances</td></tr>
          </tbody>
        </table>

        <h2 id="livewire-components">2. Livewire Components</h2>
        <div className="space-y-6">
          <h3 id="je-form">Form Component</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>File</strong>: <code>Accounting/Livewire/JournalEntry/Form.php</code></li>
            <li><strong>mount()</strong> – Initializes blank form or pre-loads when editing.</li>
            <li>Supports query params <code>transaction</code> & <code>transactionTypeId</code> to prefill lines from un-posted transactions.</li>
            <li>Dynamic <code>entries</code> array captured via Alpine JS in Blade template.</li>
            <li><strong>save()</strong> – validates balanced debits/credits, stores header & lines atomically.</li>
          </ul>

          <h3 id="je-lists">Lists Component</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>File</strong>: <code>Accounting/Livewire/JournalEntry/Lists.php</code></li>
            <li>Provides filters for fiscal period, posting status, and search by code or description.</li>
            <li>Implements export in CSV/PDF via <code>datatable</code> trait.</li>
            <li>Each row links to view, edit, or print voucher.</li>
          </ul>
        </div>

        <h2 id="posting-flow">3. Posting Flow</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Accountant opens an un-posted transaction from the Transactions module and clicks “Post”.</li>
          <li>The Journal Entry form receives <code>transaction</code> and <code>transactionTypeId</code>, converts source lines to debit/credit pairs.</li>
          <li>User reviews, adjusts accounts if necessary, ensures totals balance, and saves.</li>
          <li>If <code>is_post</code> is true, account balances update immediately; otherwise the entry is saved as draft.</li>
        </ol>

        <h2 id="audit">4. Audit & Editing</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Editing is blocked once the fiscal period is closed.</li>
          <li>Updates trigger recalculation of balances via model events.</li>
          <li>All changes are logged in the <code>journal_entry_revisions</code> table (see database triggers).</li>
        </ul>

        <h2 id="extending">5. Extending via Code</h2>
        <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto">
{`// Create manual entry
JournalEntry::create([
  'journal_code' => 'JE-2025-0002',
  'entry_date'   => '2025-07-29',
  'is_post'      => true,
  'lines' => [
    ['account_id' => 101, 'debit_amount' => 1000, 'credit_amount' => 0,   'description' => 'Cash deposit'],
    ['account_id' => 400, 'debit_amount' => 0,    'credit_amount' => 1000,'description' => 'Sales revenue'],
  ],
]);`}
        </pre>

        <p className="mt-10">Last updated: 29 Jul 2025</p>
      </article>

      {/* TOC */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2 sticky top-24 self-start text-sm">
        <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
          <p className="uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">On this page</p>
          <ul className="space-y-1">
            <li><a href="#database-schema" className="hover:text-brand-600 dark:hover:text-brand-400">Database Schema</a></li>
            <li><a href="#livewire-components" className="hover:text-brand-600 dark:hover:text-brand-400">Livewire Components</a></li>
            <li className="ml-4"><a href="#je-form" className="hover:text-brand-600 dark:hover:text-brand-400">— Form</a></li>
            <li className="ml-4"><a href="#je-lists" className="hover:text-brand-600 dark:hover:text-brand-400">— Lists</a></li>
            <li><a href="#posting-flow" className="hover:text-brand-600 dark:hover:text-brand-400">Posting Flow</a></li>
            <li><a href="#audit" className="hover:text-brand-600 dark:hover:text-brand-400">Audit & Editing</a></li>
            <li><a href="#extending" className="hover:text-brand-600 dark:hover:text-brand-400">Extending via Code</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
