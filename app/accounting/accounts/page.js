"use client";

export default function AccountsDocs() {
  return (
    <div className="flex gap-8">
      {/* Main article */}
      <article className="prose prose-lg leading-relaxed space-y-8 prose-p:leading-7 prose-slate dark:prose-invert max-w-4xl mx-auto prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-10 prose-table:shadow-sm prose-table:bg-white dark:prose-table:bg-gray-800 prose-pre:bg-gray-800 prose-pre:text-gray-100 rounded-lg">
        <h1>Account</h1>

        <blockquote className="border-l-4 border-yellow-500 bg-brand-50 dark:bg-yellow-700/20 p-4 rounded-md shadow-sm">
          <p>This guide outlines how accounts are stored, displayed, and manipulated within the Accounting module.</p>
        </blockquote>

        <h2 id="database-schema">1. Database Schema</h2>
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden text-sm">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr className="even:bg-gray-50 dark:even:bg-gray-800">
                <th className="px-2 py-1 text-left border-b">Column</th>
                <th className="px-2 py-1 text-left border-b">Type</th>
                <th className="px-2 py-1 text-left border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">id</td><td className="border p-2">BIGINT</td><td className="border p-2">Primary key</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">account_type_id</td><td className="border p-2">BIGINT (FK)</td><td className="border p-2">Links to `account_types.id`</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">parent_account_id</td><td className="border p-2">BIGINT (FK)</td><td className="border p-2">Self-referencing parent account</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">account_code</td><td className="border p-2">VARCHAR(25)</td><td className="border p-2">Human readable code e.g. 1000</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">account_name</td><td className="border p-2">VARCHAR(120)</td><td className="border p-2">Descriptive name</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">nature</td><td className="border p-2">ENUM('DR','CR')</td><td className="border p-2">Normal balance side</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">is_active</td><td className="border p-2">BOOLEAN</td><td className="border p-2">Soft toggle for UI visibility</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">created_at</td><td className="border p-2">TIMESTAMP</td><td className="border p-2">Laravel managed</td></tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-800"><td className="border p-2">updated_at</td><td className="border p-2">TIMESTAMP</td><td className="border p-2">Laravel managed</td></tr>
            </tbody>
          </table>

        <h2 id="livewire-components">2. Livewire Components</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
            <h3 id="form-component" className="mt-4">Form Component</h3>
            <ul className="list-disc pl-6  space-y-1">
              <li><strong>File</strong>: <code>Accounting/Livewire/Account/Form.php</code></li>
              <li><strong>Public props</strong>: <code>accountTypeId</code>, <code>parentAccountId</code>, <code>accountCode</code>, <code>accountName</code>, <code>nature</code>, <code>isActive</code></li>
              <li><strong>mount($id = null)</strong> – preloads data when editing</li>
              <li><strong>save()</strong> – validates (<code>accountTypeId</code>, <code>accountCode</code>, <code>accountName</code>, <code>nature</code>) then wraps <code>create()</code>/<code>update()</code> in DB transaction and emits <code>success</code></li>
              <li>Blade usage: <code>@livewire('account.form')</code></li>
            </ul>

<h3 id="lists-component" className="mt-4">Lists Component</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>File</strong>: <code>Accounting/Livewire/Account/Lists.php</code></li>
              <li><strong>Mixins</strong>: <code>datatable</code>, <code>WithPagination</code></li>
              <li><strong>Filters</strong>: <code>search</code>, <code>accountTypeFilterId</code>, <code>parentAccountFilterId</code></li>
              <li><strong>render()</strong> – builds Eloquent query with conditional <code>when()</code> filters, paginates, returns blade view</li>
              <li><strong>delete($id)</strong> – soft-deletes account then emits <code>success</code></li>
              <li>Blade usage: <code>@livewire('account.lists')</code></li>
            </ul>

<h3 id="structure-component" className="mt-4">Structure Component</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>File</strong>: <code>Accounting/Livewire/Account/Structure.php</code></li>
              <li>Groups root-level accounts by <code>accountType</code>; eager loads sums (<code>withSum</code>) for debit/credit</li>
              <li>Renders blade <code>structure</code> view which recursively invokes <code>SubAccount</code></li>
              <li>Blade usage: <code>@livewire('account.structure')</code></li>
            </ul>
            <p className=""><strong>SubAccount</strong> (<code>Accounting/Livewire/Account/SubAccount.php</code>) – rendered by <code>Structure</code>; computes badge color based on nesting level.</p>
          </ul>

        <h2 id="blade-views">3. Blade Views</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>`resources/views/accounting/livewire/account/form.blade.php` – rendered by <code>Form</code>.</li>
            <li>`resources/views/accounting/livewire/account/lists.blade.php` – rendered by <code>Lists</code>.</li>
            <li>`resources/views/accounting/livewire/account/structure.blade.php` – rendered by <code>Structure</code>.</li>
            <li>`resources/views/accounting/livewire/account/sub-account.blade.php` – rendered recursively by <code>SubAccount</code>.</li>
          </ul>

        <h2 id="extending">4. Extending via Code</h2>
        <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto text-sm"><code>{`// Example: create a new Account
Account::create([
  'account_number' => '1000',
  'account_name'   => 'Cash',
  'type_id'        => 1,
]);`}</code></pre>

        <h2 id="testing-hooks">5. Testing Hooks</h2>
        <p>Livewire components can be tested with <code>@livewire</code> in Blade or by using <code>Livewire::test()</code> in your PHPUnit test cases. Stub models with factories and assert emitted events or browser DOM changes.</p>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Last updated: 29 Jul 2025</p>
      </article>

      {/* TOC */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2 sticky top-24 self-start text-sm">
        <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
          <p className=" font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">On this page</p>
          <ul className="space-y-1">
            <li><a href="#database-schema" className="hover:text-brand-600 dark:hover:text-brand-400">Database Schema</a></li>
            <li><a href="#livewire-components" className="hover:text-brand-600 dark:hover:text-brand-400">Livewire Components</a></li>
            <li className="ml-4"><a href="#form-component" className="hover:text-brand-600 dark:hover:text-brand-400">— Form</a></li>
            <li className="ml-4"><a href="#lists-component" className="hover:text-brand-600 dark:hover:text-brand-400">— Lists</a></li>
            <li className="ml-4"><a href="#structure-component" className="hover:text-brand-600 dark:hover:text-brand-400">— Structure</a></li>
            <li><a href="#blade-views" className="hover:text-brand-600 dark:hover:text-brand-400">Blade Views</a></li>
            <li><a href="#extending" className="hover:text-brand-600 dark:hover:text-brand-400">Extending via Code</a></li>
            <li><a href="#testing-hooks" className="hover:text-brand-600 dark:hover:text-brand-400">Testing Hooks</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
