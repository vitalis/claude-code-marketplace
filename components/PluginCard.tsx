import { PluginEntry } from '@/types/plugin';

interface PluginCardProps {
  plugin: PluginEntry;
}

export default function PluginCard({ plugin }: PluginCardProps) {
  const authorName = typeof plugin.author === 'string'
    ? plugin.author
    : plugin.author?.name || 'Unknown';

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {plugin.name}
        </h3>
        {plugin.version && (
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            v{plugin.version}
          </span>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
        {plugin.description || 'No description available'}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          by {authorName}
        </span>
        {plugin.license && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {plugin.license}
          </span>
        )}
      </div>

      {plugin.tags && plugin.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {plugin.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {plugin.homepage && (
          <a
            href={plugin.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Homepage
          </a>
        )}
        {plugin.repository && (
          <a
            href={plugin.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Repository
          </a>
        )}
      </div>
    </div>
  );
}
