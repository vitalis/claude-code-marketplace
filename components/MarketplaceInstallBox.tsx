'use client';

interface MarketplaceInstallBoxProps {
  repositoryUrl: string;
}

export default function MarketplaceInstallBox({ repositoryUrl }: MarketplaceInstallBoxProps) {
  const repoSlug = repositoryUrl.replace('https://github.com/', '');
  const command = `/plugin marketplace add ${repoSlug}`;

  return (
    <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Add this marketplace to Claude Code
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Run this command in Claude Code to add all plugins from this marketplace:
      </p>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="relative bg-gray-900 dark:bg-gray-950 rounded-xl p-4 font-mono text-sm overflow-x-auto">
          <code className="text-green-400">
            {command}
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(command);
            }}
            className="absolute top-3 right-3 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs rounded transition-all hover:scale-105 border border-gray-700 hover:border-gray-600"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
