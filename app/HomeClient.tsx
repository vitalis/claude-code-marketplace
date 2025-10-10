'use client';

import { useState, useMemo } from 'react';
import { FetchedMarketplace } from '@/types/marketplace';
import { PluginEntry } from '@/types/plugin';
import MarketplaceCard from '@/components/MarketplaceCard';
import PluginCard from '@/components/PluginCard';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedHeader from '@/components/AnimatedHeader';
import StructuredData from '@/components/StructuredData';
import marketplacesData from '@/.claude-plugin/marketplaces.json';

interface HomeClientProps {
  marketplaces: FetchedMarketplace[];
}

export default function HomeClient({ marketplaces }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search logic
  const { filteredMarketplaces, filteredPlugins, isSearching, hasResults } = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const isSearching = query.length > 0;

    if (!isSearching) {
      return {
        filteredMarketplaces: marketplaces,
        filteredPlugins: [],
        isSearching: false,
        hasResults: false,
      };
    }

    // Search marketplaces
    const matchedMarketplaces = marketplaces.filter((marketplace) => {
      const searchableText = [
        marketplace.name,
        marketplace.description,
        marketplace.owner.name,
        ...(marketplace.tags || []),
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });

    // Search plugins across all marketplaces
    const matchedPlugins: Array<{ plugin: PluginEntry; marketplace: FetchedMarketplace }> = [];

    marketplaces.forEach((marketplace) => {
      if (marketplace.manifest?.plugins) {
        marketplace.manifest.plugins.forEach((plugin) => {
          const searchableText = [
            plugin.name,
            plugin.description,
            ...(plugin.tags || []),
            ...(plugin.keywords || []),
          ].join(' ').toLowerCase();

          if (searchableText.includes(query)) {
            matchedPlugins.push({ plugin, marketplace });
          }
        });
      }
    });

    return {
      filteredMarketplaces: matchedMarketplaces,
      filteredPlugins: matchedPlugins,
      isSearching: true,
      hasResults: matchedMarketplaces.length > 0 || matchedPlugins.length > 0,
    };
  }, [searchQuery, marketplaces]);

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#0A0A0A] flex flex-col">
      <StructuredData />

      {/* Announcement Banner */}
      <div className="bg-[#1E1E1E] dark:bg-[#141414] text-white border-b border-gray-800 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="font-medium">Claude Code Plugins are here.</span>
            <a
              href="https://www.anthropic.com/news/claude-code-plugins?utm_source=claudecodemarketplace&utm_medium=banner&utm_campaign=plugin_launch"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300 transition-colors font-medium"
            >
              Learn more →
            </a>
          </div>
        </div>
      </div>

      <header className="bg-[#f0eee6] dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-gray-800" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* SEO H1 - visually hidden but accessible */}
          <h1 className="sr-only">Claude Code Plugins - Discover and Install Extensions for Claude Code</h1>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <AnimatedHeader />
            <div className="hidden sm:flex items-center gap-3 sm:flex-shrink-0">
              <ThemeToggle />
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#d97757] hover:bg-[#c96647] text-white dark:bg-transparent dark:border-2 dark:border-[#d97757] dark:text-[#d97757] dark:hover:bg-[#d97757]/10 dark:hover:border-[#c96647] text-sm font-medium transition-colors whitespace-nowrap rounded-lg"
              >
                Submit Marketplace
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {marketplaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <div className="text-center max-w-md px-4">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
                No Marketplaces Yet
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                Be the first to contribute! Submit your Claude Code marketplace and help build the ecosystem.
              </p>
              <a
                href="https://github.com/joesaunderson/claude-code-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 bg-[#d97757] hover:bg-[#c96647] text-white dark:bg-transparent dark:border-2 dark:border-[#d97757] dark:text-[#d97757] dark:hover:bg-[#d97757]/10 dark:hover:border-[#c96647] text-sm font-medium transition-colors rounded-lg"
              >
                Submit Your Marketplace
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search marketplaces and plugins by name, description, tags, or keywords..."
              />
            </div>

            {!isSearching ? (
              <>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredMarketplaces.length} of {marketplaces.length} marketplaces
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredMarketplaces.map((marketplace) => (
                    <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
                  ))}
                </div>
              </>
            ) : !hasResults ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No marketplaces or plugins found matching your search.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Marketplace Results */}
                {filteredMarketplaces.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Marketplaces ({filteredMarketplaces.length})
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredMarketplaces.map((marketplace) => (
                        <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Plugin Results */}
                {filteredPlugins.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Plugins ({filteredPlugins.length})
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-[#d97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Install marketplace first, then plugin</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredPlugins.map(({ plugin, marketplace }) => (
                        <div key={`${marketplace.id}-${plugin.name}`} className="flex flex-col gap-3">
                          {/* Marketplace Info Card */}
                          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-2 border-[#d97757] dark:border-[#d97757]/60 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#d97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span className="text-sm font-semibold text-[#d97757] dark:text-[#d97757]">
                                  From: {marketplace.name}
                                </span>
                              </div>
                              <a
                                href={`/marketplace/${marketplace.id}`}
                                className="text-xs text-[#d97757] hover:underline"
                              >
                                View →
                              </a>
                            </div>
                            <div className="relative group/install">
                              <p className="text-[10px] uppercase tracking-wide text-[#c96647] dark:text-[#d97757] font-semibold mb-1">Step 1: Install Marketplace</p>
                              <div className="relative bg-[#f0eee6] dark:bg-gray-950 rounded-lg p-2 font-mono text-xs overflow-x-auto border border-[#e8e6dc] dark:border-gray-900">
                                <code className="text-[#141413] dark:text-green-400">
                                  /plugin marketplace add {marketplace.repository.replace('https://github.com/', '')}
                                </code>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(`/plugin marketplace add ${marketplace.repository.replace('https://github.com/', '')}`);
                                  }}
                                  className="absolute top-1.5 right-1.5 px-2 py-1 bg-[#e8e6dc] hover:bg-[#dbd9cd] dark:bg-gray-800 dark:hover:bg-gray-700 text-[#141413] dark:text-gray-300 hover:text-black dark:hover:text-white text-[10px] rounded transition-colors border border-[#dbd9cd] dark:border-gray-700"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* Plugin Card */}
                          <PluginCard plugin={plugin} marketplaceName={marketplace.id} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-auto bg-[#f0eee6] dark:bg-[#0A0A0A] border-t border-gray-200 dark:border-gray-800" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile action buttons */}
          <div className="flex sm:hidden items-center justify-center gap-3 mb-6">
            <ThemeToggle />
            <a
              href="https://github.com/joesaunderson/claude-code-marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#d97757] hover:bg-[#c96647] text-white dark:bg-transparent dark:border-2 dark:border-[#d97757] dark:text-[#d97757] dark:hover:bg-[#d97757]/10 dark:hover:border-[#c96647] text-sm font-medium transition-colors whitespace-nowrap rounded-lg"
            >
              Submit Marketplace
            </a>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
              A decentralized hub connecting you to Claude Code plugin marketplaces
            </p>
            <nav className="flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400" aria-label="Footer navigation">
              <a href="/about" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">About & Safety</a>
              <a href="https://github.com/joesaunderson/claude-code-marketplace" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">GitHub</a>
              <a href="https://www.anthropic.com/news/claude-code-plugins" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">About Claude Code</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
