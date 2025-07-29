"use client";

export default function TransactionsDocs() {
  return (
    <div className="flex gap-8">
      {/* Main article */}
      <article className="prose prose-lg leading-relaxed space-y-8 prose-p:leading-7 prose-slate dark:prose-invert max-w-4xl mx-auto prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-10 prose-table:shadow-sm prose-table:bg-white dark:prose-table:bg-gray-800 prose-pre:bg-gray-800 prose-pre:text-gray-100 rounded-lg">
        <h1>Transactions</h1>

        <blockquote className="border-l-4 border-yellow-500 bg-brand-50 dark:bg-yellow-700/20 p-4 rounded-md shadow-sm">
          <p>
            Transactions represent business activities (sales, purchases, payments,
            expenses, etc.) that have <em>not yet</em> been posted to the accounting{" "}
            <strong>Journal Entry</strong> table. Each list screen helps accountants
            review and convert them into journal entries.
          </p>
        </blockquote>

        <h2 id="livewire-structure">1. Livewire Structure</h2>
        <p>The feature is split into one generic list and several type-specific list components:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <code>Transaction\Lists</code> – parent wrapper that receives a <code>type</code>{" "}
            parameter and loads the Blade view.
          </li>
          <li>
            Type-specific components under <code>Transaction\Type\*</code>:
            <ul className="list-disc pl-6 space-y-1">
              <li><code>Sale</code> – customer invoices awaiting posting</li>
              <li><code>Purchase</code> – supplier bills awaiting posting</li>
              <li><code>Payment</code> – payment vouchers (in/out)</li>
              <li><code>Expense</code> – petty-cash / misc expenses</li>
              <li><code>Adjustment</code> – stock / value adjustments</li>
            </ul>
          </li>
          <li>
            <code>Transaction\Action\Action</code> – small helper that renders a “Post” button
            and redirects to the journal-entry creation form.
          </li>
        </ul>

        <h2 id="common-patterns">2. Common Listing Patterns</h2>
        <p>All type components share the following conventions:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Mixin traits: <code>datatable</code> for column definition & export, and <code>WithPagination</code> for paging.</li>
          <li>Property <code>$search</code> for global search; additional filter properties vary per type.</li>
          <li>
            <code>render()</code> method builds an Eloquent query with <code>when()</code> scopes and{" "}
            <code>whereDoesntHave('journalEntry')</code> to ensure only un-posted transactions appear.
          </li>
          <li>
            Each row includes a{" "}
            <code>{`<livewire:transaction.action.action :type="$slug" :id="$row->id" />`}</code>{" "}
            component that sends users to the Journal Entry UI.
          </li>
        </ul>

        <h2 id="payment-list">3. Example – Payment List</h2>
        <p>The <code>Payment</code> component illustrates a typical implementation:</p>
        <ul className="list-disc pl-6  space-y-1">
          <li><strong>File</strong>: <code>Accounting/Livewire/Transaction/Type/Payment.php</code></li>
          <li><strong>Filters</strong>: <code>locationFilter</code>, <code>paymentMethodFilter</code>, <code>paymentAccountFilter</code>, <code>paymentTypeFilter</code>, <code>dateFilter</code></li>
          <li><strong>Query</strong>: Joins currency, account & method, applies filters, excludes rows already linked to journal entries, sorts latest.</li>
          <li><code>paymentHistories</code> are paginated then passed to <code>transaction.type.payment</code> Blade.</li>
        </ul>

        <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto">{`// Inside render()
$paymentHistories = paymentsTransactions::with('currency', 'payment_account:id,name')
  ->when($this->locationFilter != 'all', fn ($q) => $q->where('location_id', $this->locationFilter))
  // ...more filters...
  ->whereDoesntHave('journalEntry') // ensure not yet posted
  ->latest()->simplePaginate($this->perPage);`}</pre>

        <h2 id="posting-flow">4. Posting Flow</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>User clicks the “Post” action on any list row.</li>
          <li>
            <code>Transaction\Action\Action::redirectToEntryCreate()</code> sends them to{" "}
            <code>route('journal-entry.create')</code> with query params <code>transaction</code>{" "}
            & <code>transactionTypeId</code>.
          </li>
          <li>The Journal Entry form pre-loads source data and lets the accountant confirm and save.</li>
        </ol>

        <h2 id="extending">5. Extending / Adding New Transaction Types</h2>
        <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto">{`php artisan make:livewire Accounting/Transaction/Type/MyNewType

// implement filters, query and blade
// ensure query has ->whereDoesntHave('journalEntry') to avoid duplicates`}</pre>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          Last updated: 29 Jul 2025
        </p>
      </article>

      {/* TOC */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2 sticky top-24 self-start text-sm">
        <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
          <p className=" font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            On this page
          </p>
          <ul className="space-y-1">
            <li><a href="#livewire-structure" className="hover:text-brand-600 dark:hover:text-brand-400">Livewire Structure</a></li>
            <li><a href="#common-patterns" className="hover:text-brand-600 dark:hover:text-brand-400">Common Patterns</a></li>
            <li><a href="#payment-list" className="hover:text-brand-600 dark:hover:text-brand-400">Example – Payment</a></li>
            <li><a href="#posting-flow" className="hover:text-brand-600 dark:hover:text-brand-400">Posting Flow</a></li>
            <li><a href="#extending" className="hover:text-brand-600 dark:hover:text-brand-400">Extending Types</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
