'use client';

import { useState, useMemo } from 'react';
import PluginCard from '@/components/PluginCard';
import SearchBar from '@/components/SearchBar';
import { MarketplaceManifest } from '@/types/plugin';
import marketplaceData from '@/.claude-plugin/marketplace.json';

const marketplace = marketplaceData as MarketplaceManifest;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlugins = useMemo(() => {
    if (!searchQuery.trim()) {
      return marketplace.plugins;
    }

    const query = searchQuery.toLowerCase();
    return marketplace.plugins.filter((plugin) => {
      const nameMatch = plugin.name.toLowerCase().includes(query);
      const descriptionMatch = plugin.description?.toLowerCase().includes(query);
      const tagsMatch = plugin.tags?.some((tag) => tag.toLowerCase().includes(query));
      const keywordsMatch = plugin.keywords?.some((keyword) => keyword.toLowerCase().includes(query));

      return nameMatch || descriptionMatch || tagsMatch || keywordsMatch;
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Claude Code Marketplace
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {marketplace.metadata?.description || 'Discover and install Claude Code plugins'}
              </p>
            </div>
            <a
              href="https://github.com/joesaunderson/claude-code-marketplace/compare"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Submit Plugin
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {marketplace.plugins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Plugins Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Be the first to contribute! Submit your Claude Code plugin and help build the community marketplace.
              </p>
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace/compare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Submit Your Plugin
              </a>
            </div>
          </div>
        ) : (
          <>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredPlugins.length} of {marketplace.plugins.length} plugins
            </div>

            {filteredPlugins.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No plugins found matching your search.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlugins.map((plugin) => (
                  <PluginCard key={plugin.name} plugin={plugin} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Claude Code Marketplace - Community plugins for Claude Code
          </p>
        </div>
      </footer>
    </div>
  );
}
