"use client";

export default function FiscalPeriodsDocs() {
  return (
    <div className="flex gap-8">
      {/* Main article */}
      <article className="prose prose-lg leading-relaxed space-y-8 prose-p:leading-7 prose-slate dark:prose-invert max-w-4xl mx-auto prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-10 prose-table:shadow-sm prose-table:bg-white dark:prose-table:bg-gray-800 prose-pre:bg-gray-800 prose-pre:text-gray-100 rounded-lg">
              <h1>Fiscal Period</h1>

        <blockquote className="border-l-4 border-yellow-500 bg-brand-50 dark:bg-yellow-700/20 p-4 rounded-md shadow-sm">
          <p>This guide covers database structure, Livewire components, and extension points for managing fiscal periods.</p>
        </blockquote>

        <h2 id="database-schema">1. Database Schema</h2>
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr className="even:bg-gray-50 dark:even:bg-gray-800">
              <th className="border p-2 text-left">Column</th>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">id</td><td className="border p-2">BIGINT</td><td className="border p-2">Primary key</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">period_name</td><td className="border p-2">VARCHAR(120)</td><td className="border p-2">Display name (e.g. FY-2025 Q1)</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">start_date</td><td className="border p-2">DATE</td><td className="border p-2">Inclusive start</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">end_date</td><td className="border p-2">DATE</td><td className="border p-2">Inclusive end</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">is_close</td><td className="border p-2">BOOLEAN</td><td className="border p-2">Marked true once books are closed</td></tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">created_at / updated_at</td><td className="border p-2">TIMESTAMP</td><td className="border p-2">Managed by Eloquent</td></tr>
          </tbody>
        </table>

        <h2 id="livewire-components">2. Livewire Components</h2>
        <div className="space-y-6">
          <h3 id="fp-form" className="mt-4">Form Component</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>File</strong>: <code>Accounting/Livewire/FiscalPeriod/Form.php</code></li>
            <li><strong>Public props</strong>: <code>periodName</code>, <code>startDate</code>, <code>endDate</code>, <code>isClose</code></li>
            <li><strong>mount($id)</strong> – loads an existing row when editing</li>
            <li><strong>save()</strong> – validates required fields then delegates to <code>create()</code>/<code>update()</code> inside a DB transaction</li>
            <li>Validation rules: <code>periodName</code>, <code>startDate</code>, <code>endDate</code> are required</li>
            <li>Blade usage: <code>@livewire('fiscal-period.form')</code></li>
          </ul>

          <h3 id="fp-lists" className="mt-4">Lists Component</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>File</strong>: <code>Accounting/Livewire/FiscalPeriod/Lists.php</code></li>
            <li><strong>Mixins</strong>: <code>datatable</code>, <code>WithPagination</code></li>
            <li><strong>Filters</strong>: search by name, <code>statusFilter</code> (open / closed)</li>
            <li><strong>render()</strong> – builds query with <code>when()</code> filters, paginates, returns blade view</li>
            <li><strong>delete($id)</strong> – hard-deletes row then redirects</li>
            <li>Blade usage: <code>@livewire('fiscal-period.lists')</code></li>
          </ul>
        </div>

        <h2 id="blade-views">3. Blade Views</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><code>resources/views/accounting/livewire/fiscal-period/form.blade.php</code> – rendered by Form</li>
          <li><code>resources/views/accounting/livewire/fiscal-period/lists.blade.php</code> – rendered by Lists</li>
        </ul>

        <h2 id="extending">4. Extending via Code</h2>
        <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto text-sm">
          <code>
            {`// Create a period programmatically
            FiscalPeriod::create({
              period_name: 'FY-2026',
              start_date: '2026-01-01',
              end_date:   '2026-12-31',
            });

            // Mark period closed
            $fiscalPeriod->update(['is_close' => true]);`}
          </code>
        </pre>

        <h2 id="testing-hooks">5. Testing Hooks</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Use <code>Livewire::test(FiscalPeriod\Form::class)</code> to assert validation and DB writes.</li>
          <li>Feature tests seed fixture data and hit <code>/fiscal-period</code> routes.</li>
        </ol>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Last updated: 29 Jul 2025</p>
      </article>

      {/* TOC */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2 sticky top-24 self-start text-sm">
        <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">On this page</p>
          <ul className="space-y-1">
            <li><a href="#database-schema" className="hover:text-brand-600 dark:hover:text-brand-400">Database Schema</a></li>
            <li><a href="#livewire-components" className="hover:text-brand-600 dark:hover:text-brand-400">Livewire Components</a></li>
            <li className="ml-4"><a href="#fp-form" className="hover:text-brand-600 dark:hover:text-brand-400">— Form</a></li>
            <li className="ml-4"><a href="#fp-lists" className="hover:text-brand-600 dark:hover:text-brand-400">— Lists</a></li>
            <li><a href="#blade-views" className="hover:text-brand-600 dark:hover:text-brand-400">Blade Views</a></li>
            <li><a href="#extending" className="hover:text-brand-600 dark:hover:text-brand-400">Extending via Code</a></li>
            <li><a href="#testing-hooks" className="hover:text-brand-600 dark:hover:text-brand-400">Testing Hooks</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
