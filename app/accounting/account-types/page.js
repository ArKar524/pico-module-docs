"use client";

import { useEffect } from "react";

export default function AccountTypesDocs() {
  return (
    <div className="flex gap-8">
      {/* Main article */}
      <article className="prose prose-lg leading-relaxed space-y-8 prose-p:leading-7 prose-slate dark:prose-invert max-w-4xl mx-auto prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-10 prose-table:shadow-sm prose-table:bg-white dark:prose-table:bg-gray-800 prose-pre:bg-gray-800 prose-pre:text-gray-100 rounded-lg">
        <h1>Account Type</h1>

        <blockquote className="border-l-4 border-yellow-500 bg-brand-50 dark:bg-yellow-700/20 p-4 rounded-md shadow-sm">
          <p>This guide dives into the Livewire implementation (<code>AccountType\\Form</code> &amp; <code>AccountType\\Lists</code>) and shows how to extend or integrate the feature programmatically.</p>
        </blockquote>

        <h2 id="database-schema">1. Database Schema</h2>
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="border p-2">Column</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800">
              <td className="border p-2"><code>id</code></td>
              <td className="border p-2">BIGINT</td>
              <td className="border p-2">Primary key</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800">
              <td className="border p-2"><code>type_name</code></td>
              <td className="border p-2">VARCHAR(120)</td>
              <td className="border p-2">Required, displayed in UI</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800">
              <td className="border p-2"><code>description</code></td>
              <td className="border p-2">TEXT, nullable</td>
              <td className="border p-2">Helper text</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-800">
              <td className="border p-2"><code>created_at / updated_at</code></td>
              <td className="border p-2">TIMESTAMP</td>
              <td className="border p-2">Managed by Eloquent</td>
            </tr>
          </tbody>
        </table>

        <h2 id="livewire-components">2. Livewire Components</h2>

        <h3><code>AccountType\\Lists</code></h3>
        <ul>
          <li>Traits: <code>datatable</code>, <code>WithPagination</code></li>
          <li>Props: <code>search</code>, plus pagination props from trait</li>
          <li>Render pipeline: query with <code>when($search)</code> filter ➜ paginate ➜ blade view</li>
          <li><strong>delete($id)</strong> – soft-deletes the row then dispatches a <code>success</code> event</li>
        </ul>

        <h3><code>AccountType\\Form</code></h3>
        <ul>
          <li>Reactive inputs: <code>typeName</code>, <code>description</code></li>
          <li><code>mount($id)</code> pre-loads existing row for edit mode</li>
          <li><code>save()</code> wraps <code>create()</code> / <code>update()</code> in a DB transaction</li>
          <li>Validation: <code>typeName ➜ required</code></li>
        </ul>

        <h2 id="blade-views">3. Blade Views</h2>
        <p>Find them under <code>resources/views/accounting/livewire/account-type</code>:</p>
        <ul className="list-disc ml-6">
          <li><code>form.blade.php</code> – tailwind form with inputs &amp; save button</li>
          <li><code>lists.blade.php</code> – table component with search box and 🗑️ buttons</li>
        </ul>

        <h2 id="extending">4. Extending via Code</h2>
        <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto text-sm">
          <code>{`// Programmatically create a new Account Type\nAccountType::create([\n    'type_name'   => 'Equity',\n    'description' => 'Owner\'s equity accounts',\n]);\n\n// Updating inside a service class\n$equity->update(['description' => 'Capital & Drawings']);\n\n// Safe delete via repository\n$repo->removeAccountType($id);`}</code>
        </pre>

        <h2 id="testing-hooks">5. Testing Hooks</h2>
        <ol className="list-decimal ml-6">
          <li>Use <code>Livewire::test(AccountType\\Form::class)</code> to assert validation and DB writes.</li>
          <li>Feature tests seed fixture data and hit <code>/account-type</code> route.</li>
        </ol>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Last updated: 29 Jul 2025</p>
      </article>

      {/* TOC */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2 sticky top-24 self-start text-sm">
        <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            On this page
          </p>
          <ul className="space-y-1">
            <li><a href="#database-schema" className="hover:text-brand-600 dark:hover:text-brand-400">Database Schema</a></li>
            <li><a href="#livewire-components" className="hover:text-brand-600 dark:hover:text-brand-400">Livewire Components</a></li>
            <li><a href="#blade-views" className="hover:text-brand-600 dark:hover:text-brand-400">Blade Views</a></li>
            <li><a href="#extending" className="hover:text-brand-600 dark:hover:text-brand-400">Extending via Code</a></li>
            <li><a href="#testing-hooks" className="hover:text-brand-600 dark:hover:text-brand-400">Testing Hooks</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
