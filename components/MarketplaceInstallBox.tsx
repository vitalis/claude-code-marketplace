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
      <div className="relative">
        <div className="relative bg-[#f0eee6] dark:bg-gray-950 rounded-xl p-4 font-mono text-sm overflow-x-auto border border-[#e8e6dc] dark:border-gray-900">
          <code className="text-[#141413] dark:text-green-400">
            {command}
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(command);
            }}
            className="absolute top-3 right-3 px-3 py-1.5 bg-[#e8e6dc] hover:bg-[#dbd9cd] dark:bg-gray-800 dark:hover:bg-gray-700 text-[#141413] dark:text-gray-300 hover:text-black dark:hover:text-white text-xs rounded transition-colors border border-[#dbd9cd] dark:border-gray-700"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
