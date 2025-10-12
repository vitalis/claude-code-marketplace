import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About & Safety',
  description: 'Learn about Claude Code Plugins directory, how it works, and our safety practices for discovering and installing extensions.',
  alternates: {
    types: {
      'text/markdown': 'https://claudecodemarketplace.com/markdown/about',
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            About Claude Code Plugins
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              What is the Marketplace Hub?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The Claude Code Marketplace Hub is a decentralized directory that connects you to multiple{' '}
              <a
                href="https://www.anthropic.com/news/claude-code-plugins"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Claude Code
              </a>{' '}
              plugin marketplaces. Instead of hosting plugins directly, we provide a central discovery
              point for community-maintained marketplaces.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              This approach allows:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Communities to maintain their own specialized plugin collections</li>
              <li>Faster plugin approval and updates (no central bottleneck)</li>
              <li>Marketplace diversity and specialization (e.g., templates, tools, frameworks)</li>
              <li>Decentralized control and ownership</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              How do marketplaces work?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Each marketplace listed in our hub:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Hosts its own plugin collection on GitHub</li>
              <li>Maintains a <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">.claude-plugin/marketplace.json</code> file</li>
              <li>Controls which plugins are listed and how they're organized</li>
              <li>Can be themed or specialized for specific use cases</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              The hub dynamically fetches and displays plugins from these marketplaces, giving you a unified
              discovery experience while keeping control decentralized.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              How do plugins work?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Plugins extend Claude Code's functionality using Anthropic's official plugin API:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>No separate software is downloaded or installed on your computer</li>
              <li>Plugins run within Claude Code's secure environment</li>
              <li>All plugin code is open source and publicly viewable</li>
              <li>You can review any plugin's source code before installing</li>
              <li>Plugins are loaded directly from their source repositories</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Safety & Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We take security seriously at every level:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Open Source:</strong> All marketplaces and plugins are open source with publicly viewable code</li>
              <li><strong>Decentralized:</strong> No single point of control or failure</li>
              <li><strong>GitHub Hosted:</strong> All code is hosted on GitHub for transparency and version control</li>
              <li><strong>Community Reviewed:</strong> Marketplaces and plugins are maintained by their respective communities</li>
              <li><strong>You Control Everything:</strong> You choose which marketplaces to trust and which plugins to install</li>
              <li><strong>No Data Collection:</strong> This hub doesn't collect personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Create Your Own Marketplace
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Want to start your own marketplace? It's easy:
            </p>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Create a GitHub repository for your marketplace</li>
              <li>Add a <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">.claude-plugin/marketplace.json</code> file</li>
              <li>List your plugins in the JSON file following the schema</li>
              <li>Submit your marketplace to this hub via pull request</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Your marketplace can focus on any niche: specific frameworks, tools, templates, or
              community-curated collections. See our{' '}
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub repository
              </a>{' '}
              for detailed documentation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contributing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Want to list your marketplace in the hub?{' '}
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Submit a pull request
              </a>{' '}
              on GitHub. All submissions are reviewed before being listed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Questions or Concerns?
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have security concerns or questions about this hub, please{' '}
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                open an issue on GitHub
              </a>.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to hub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
