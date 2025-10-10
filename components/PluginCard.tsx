import { PluginEntry } from '@/types/plugin';

interface PluginCardProps {
  plugin: PluginEntry;
  marketplaceName?: string;
}

export default function PluginCard({ plugin, marketplaceName }: PluginCardProps) {
  const authorName = typeof plugin.author === 'string'
    ? plugin.author
    : plugin.author?.name || 'Unknown';

  // Combine tags and keywords, remove duplicates
  const allLabels = [
    ...(plugin.tags || []),
    ...(plugin.keywords || [])
  ].filter((label, index, array) =>
    array.findIndex(l => l.toLowerCase() === label.toLowerCase()) === index
  );

  // Validate URLs to prevent malicious links
  const validateUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      // Only allow https URLs for security
      if (parsed.protocol !== 'https:') return null;
      return url;
    } catch {
      return null;
    }
  };

  const sourceUrl = validateUrl(plugin.repository || plugin.homepage);
  const isGitHub = sourceUrl?.includes('github.com');
  const linkText = isGitHub ? 'View on GitHub' : 'View Source';

  return (
    <div className="group relative border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {plugin.name}
          </h3>
          {plugin.version && (
            <span className="text-sm text-gray-600 dark:text-gray-400 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 px-3 py-1 rounded-full font-medium">
              v{plugin.version}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-1">
          {plugin.description || 'No description available'}
        </p>

        <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            by {authorName}
          </span>
          {plugin.license && (
            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              {plugin.license}
            </span>
          )}
        </div>

        {allLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {allLabels.slice(0, 4).map((label) => (
              <span
                key={label}
                className="text-xs bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-medium"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Add to Claude Code command */}
        {marketplaceName && (
          <div className="mb-4 relative group/install">
            <p className="text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400 font-semibold mb-1">Step 2: Install Plugin</p>
            <div className="relative bg-[#f0eee6] dark:bg-gray-950 rounded-lg p-2 font-mono text-xs overflow-x-auto border border-[#e8e6dc] dark:border-gray-900">
              <code className="text-[#141413] dark:text-green-400">
                /plugin install {plugin.name}@{marketplaceName}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`/plugin install ${plugin.name}@${marketplaceName}`);
                }}
                className="absolute top-1.5 right-1.5 px-2 py-1 bg-[#e8e6dc] hover:bg-[#dbd9cd] dark:bg-gray-800 dark:hover:bg-gray-700 text-[#141413] dark:text-gray-300 hover:text-black dark:hover:text-white text-[10px] rounded transition-colors border border-[#dbd9cd] dark:border-gray-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {sourceUrl && (
          <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-1"
            >
              {isGitHub ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
              {linkText} →
            </a>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
