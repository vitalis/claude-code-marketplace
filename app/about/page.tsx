import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About & Safety',
  description: 'Learn about the Claude Code Marketplace, how plugins work, and our safety practices',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            About Claude Code Marketplace
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              What is this marketplace?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              This is a community-maintained marketplace for plugins that extend{' '}
              <a
                href="https://www.anthropic.com/news/claude-code-plugins"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Claude Code
              </a>
              , Anthropic's official code editor. The plugin system is built by Anthropic,
              but individual plugins are created and maintained by the developer community.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              How do plugins work?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Plugins extend Claude Code's functionality directly within the editor using
              Anthropic's official plugin API. When you add a plugin:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>No separate software is downloaded or installed on your computer</li>
              <li>Plugins run within Claude Code's secure environment</li>
              <li>All plugin code is open source and publicly viewable on GitHub</li>
              <li>You can review any plugin's source code before adding it</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Safety & Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We take security seriously:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Open Source:</strong> All plugins are open source with publicly viewable code</li>
              <li><strong>Community Reviewed:</strong> Plugins are created and reviewed by the developer community</li>
              <li><strong>No Downloads:</strong> Nothing is downloaded to your computer outside of Claude Code</li>
              <li><strong>GitHub Hosted:</strong> All plugin code is hosted on GitHub for transparency</li>
              <li><strong>You Control What You Add:</strong> You choose which plugins to enable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              This Website
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              This marketplace website:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Does not download or install any software</li>
              <li>Does not collect personal information</li>
              <li>Simply provides a searchable directory of available plugins</li>
              <li>Links to the official GitHub repositories for each plugin</li>
              <li>Is itself open source: <a
                href="https://github.com/joesaunderson/claude-code-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View our code
              </a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contributing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Want to add your plugin to the marketplace?{' '}
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace/compare"
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
              If you have security concerns or questions about this marketplace, please{' '}
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
              ← Back to marketplace
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
