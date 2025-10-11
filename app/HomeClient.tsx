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

type SortOption = 'popular' | 'recent' | 'plugins' | 'alphabetical';

export default function HomeClient({ marketplaces }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get all unique tags with counts
  const allTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    marketplaces.forEach((marketplace) => {
      marketplace.tags?.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count); // Sort by count descending
  }, [marketplaces]);

  // Filter and search logic
  const { filteredMarketplaces, filteredPlugins, isSearching, hasResults } = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const isSearching = query.length > 0;
    const hasTagFilters = selectedTags.length > 0;

    // Start with all marketplaces
    let filtered = marketplaces;

    // Apply tag filtering
    if (hasTagFilters) {
      filtered = filtered.filter((marketplace) =>
        marketplace.tags?.some((marketplaceTag) => selectedTags.includes(marketplaceTag))
      );
    }

    // Apply search filtering
    if (isSearching) {
      filtered = filtered.filter((marketplace) => {
        const searchableText = [
          marketplace.name,
          marketplace.description,
          marketplace.owner.name,
          ...(marketplace.tags || []),
        ].join(' ').toLowerCase();
        return searchableText.includes(query);
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          // Sort by stars (descending)
          return (b.stars || 0) - (a.stars || 0);
        case 'recent':
          // Sort by last updated (most recent first)
          if (!a.lastUpdated && !b.lastUpdated) return 0;
          if (!a.lastUpdated) return 1;
          if (!b.lastUpdated) return -1;
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'plugins':
          // Sort by plugin count (descending)
          return (b.pluginCount || 0) - (a.pluginCount || 0);
        case 'alphabetical':
          // Sort alphabetically
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    if (!isSearching && !hasTagFilters) {
      return {
        filteredMarketplaces: sorted,
        filteredPlugins: [],
        isSearching: false,
        hasResults: false,
      };
    }

    // Search plugins only when actively searching (not just filtering by tags)
    const matchedMarketplaces = sorted;

    // Search plugins across all marketplaces (only when actively searching, not filtering by tags)
    const matchedPlugins: Array<{ plugin: PluginEntry; marketplace: FetchedMarketplace }> = [];

    if (isSearching) {
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
    }

    return {
      filteredMarketplaces: matchedMarketplaces,
      filteredPlugins: matchedPlugins,
      isSearching: isSearching || hasTagFilters,
      hasResults: matchedMarketplaces.length > 0 || matchedPlugins.length > 0,
    };
  }, [searchQuery, marketplaces, selectedTags, sortBy]);

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
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search marketplaces and plugins by name, description, tags, or keywords..."
              />
            </div>

            {/* Filtering and Sorting Controls */}
            <div className="mb-6">
              {/* Mobile: Filter toggle and Sort side by side */}
              <div className="md:hidden flex items-center justify-between gap-3 mb-3">
                {allTags.length > 0 && (
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {showMobileFilters ? 'Hide' : 'Tags'}
                    {selectedTags.length > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-[#d97757] text-white rounded-full">
                        {selectedTags.length}
                      </span>
                    )}
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <label htmlFor="sort-mobile" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort:
                  </label>
                  <select
                    id="sort-mobile"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d97757] focus:border-transparent"
                  >
                    <option value="popular">Popular</option>
                    <option value="recent">Recent</option>
                    <option value="plugins">Plugins</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                </div>
              </div>

              {/* Desktop: Tag chips and Sort */}
              <div className="hidden md:flex md:justify-between md:items-center gap-4">
                {/* Tag Filters */}
                {allTags.length > 0 && (
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 10).map(({ tag, count }) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => {
                              setSelectedTags((prev) =>
                                isSelected
                                  ? prev.filter((t) => t !== tag)
                                  : [...prev, tag]
                              );
                            }}
                            className={`
                              px-3 py-1.5 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5
                              ${isSelected
                                ? 'bg-[#d97757] text-white dark:bg-[#d97757] dark:text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }
                            `}
                          >
                            <span>{tag}</span>
                            <span className={`text-[10px] ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                      {selectedTags.length > 0 && (
                        <button
                          onClick={() => setSelectedTags([])}
                          className="px-3 py-1.5 text-xs font-medium text-[#d97757] hover:text-[#c96647] transition-colors"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <label htmlFor="sort-desktop" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort by:
                  </label>
                  <select
                    id="sort-desktop"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d97757] focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="recent">Recently Updated</option>
                    <option value="plugins">Most Plugins</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Mobile: Collapsible tag chips */}
              {allTags.length > 0 && showMobileFilters && (
                <div className="md:hidden flex flex-wrap gap-2 mt-3">
                  {allTags.slice(0, 10).map(({ tag, count }) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags((prev) =>
                            isSelected
                              ? prev.filter((t) => t !== tag)
                              : [...prev, tag]
                          );
                        }}
                        className={`
                          px-3 py-1.5 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5
                          ${isSelected
                            ? 'bg-[#d97757] text-white dark:bg-[#d97757] dark:text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <span>{tag}</span>
                        <span className={`text-[10px] ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="px-3 py-1.5 text-xs font-medium text-[#d97757] hover:text-[#c96647] transition-colors"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {!isSearching ? (
              <>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredMarketplaces.length} of {marketplaces.length} marketplaces
                  {selectedTags.length > 0 && ` (filtered by ${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''})`}
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
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6" aria-label="Footer navigation">
              <a href="/about" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">About & Safety</a>
              <a href="https://github.com/joesaunderson/claude-code-marketplace" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                This Site
              </a>
              <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Claude Code
              </a>
              <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Docs
              </a>
              <a href="https://www.anthropic.com/news/claude-code-plugins" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Plugin Announcement</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
