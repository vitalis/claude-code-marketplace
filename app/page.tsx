'use client';

import { useState, useMemo } from 'react';
import PluginCard from '@/components/PluginCard';
import SearchBar from '@/components/SearchBar';
import { MarketplaceManifest } from '@/types/plugin';
import marketplaceData from '@/.claude-plugin/marketplace.json';

const marketplace = marketplaceData as MarketplaceManifest;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSetup, setShowSetup] = useState(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('setupDismissed');
      return dismissed !== 'true';
    }
    return true;
  });

  const handleDismissSetup = () => {
    setShowSetup(false);
    localStorage.setItem('setupDismissed', 'true');
  };

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
            <span className="font-semibold">🎉 New!</span>
            <span>Claude Code Plugins are here.</span>
            <a
              href="https://www.anthropic.com/news/claude-code-plugins?utm_source=claudecodemarketplace&utm_medium=banner&utm_campaign=plugin_launch"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-100 transition-colors font-medium"
            >
              Learn more →
            </a>
          </div>
        </div>
      </div>

      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Claude Code Marketplace
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {marketplace.metadata?.description || 'Discover and install Claude Code plugins'}
              </p>
            </div>
            <a
              href="https://github.com/joesaunderson/claude-code-marketplace/compare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-base rounded-xl font-medium transition-all whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
            >
              Submit Plugin
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {marketplace.plugins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <div className="text-center max-w-md px-4">
              <div className="mb-6 inline-block p-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl">
                <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                No Plugins Yet
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                Be the first to contribute! Submit your Claude Code plugin and help build the community marketplace.
              </p>
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace/compare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-base rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Submit Your Plugin
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full max-w-2xl mx-auto mb-8">
              {/* Installation section */}
              {showSetup && (
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg mb-6">
                  <button
                    onClick={handleDismissSetup}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Dismiss"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      First Time Setup
                    </h2>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                      One-time
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Add this marketplace to your Claude Code:
                  </p>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity" />
                    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-xl p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                      <code className="text-green-400">
                        /plugin marketplace add joesaunderson/claude-code-marketplace
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('/plugin marketplace add joesaunderson/claude-code-marketplace');
                        }}
                        className="absolute top-2 right-2 px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs rounded transition-all hover:scale-105 border border-gray-700 hover:border-gray-600"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

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

      <footer className="mt-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Claude Code Marketplace - Community plugins for Claude Code
          </p>
        </div>
      </footer>
    </div>
  );
}
