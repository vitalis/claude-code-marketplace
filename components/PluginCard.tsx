import { PluginEntry } from '@/types/plugin';

interface PluginCardProps {
  plugin: PluginEntry;
}

export default function PluginCard({ plugin }: PluginCardProps) {
  const authorName = typeof plugin.author === 'string'
    ? plugin.author
    : plugin.author?.name || 'Unknown';

  return (
    <div className="group relative border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-600">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
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

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {plugin.description || 'No description available'}
        </p>

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

        {plugin.tags && plugin.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {plugin.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Install command */}
        <div className="mb-4 relative group/install">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg opacity-5 group-hover/install:opacity-10 transition-opacity" />
          <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg p-3 font-mono text-xs overflow-x-auto">
            <code className="text-green-400">
              /plugin install {plugin.name}@claude-code-marketplace
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`/plugin install ${plugin.name}@claude-code-marketplace`);
              }}
              className="absolute top-2 right-2 px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-[10px] rounded transition-all hover:scale-105 border border-gray-700 hover:border-gray-600"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
          {plugin.homepage && (
            <a
              href={plugin.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Homepage →
            </a>
          )}
          {plugin.repository && (
            <a
              href={plugin.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Repository →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
