'use client';

import Link from 'next/link';
import { FetchedMarketplace } from '@/types/marketplace';

interface MarketplaceCardProps {
  marketplace: FetchedMarketplace;
}

export default function MarketplaceCard({ marketplace }: MarketplaceCardProps) {
  const { id, name, description, owner, repository, tags, pluginCount, verified, error } = marketplace;

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

  const repoUrl = validateUrl(repository);
  const ownerUrl = validateUrl(owner.url);
  const isGitHub = repoUrl?.includes('github.com');

  return (
    <div className="group relative border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
              {name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                by{' '}
                {ownerUrl ? (
                  <a
                    href={ownerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {owner.name}
                  </a>
                ) : (
                  <span className="font-medium">{owner.name}</span>
                )}
              </span>
              {verified && (
                <span className="text-xs bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
          </div>
          {pluginCount !== undefined && !error && (
            <span className="text-sm text-gray-600 dark:text-gray-400 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 px-3 py-1 rounded-full font-medium whitespace-nowrap ml-3">
              {pluginCount} {pluginCount === 1 ? 'plugin' : 'plugins'}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-1">
          {description || 'No description available'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>
                <strong className="font-semibold">Setup incomplete:</strong> {error}
                <br />
                <span className="text-[10px] opacity-75">Marketplace owner needs to add marketplace.json file</span>
              </span>
            </p>
          </div>
        )}

        <div className="mt-auto">
          {/* Installation command */}
          <div className="mb-4 relative group/install">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Add this marketplace to Claude Code:</p>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg opacity-5 group-hover/install:opacity-10 transition-opacity" />
            <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg p-3 font-mono text-xs overflow-x-auto">
              <code className="text-green-400">
                /plugin marketplace add {repoUrl ? repoUrl.replace('https://github.com/', '') : id}
              </code>
              <button
                onClick={() => {
                  const command = `/plugin marketplace add ${repoUrl ? repoUrl.replace('https://github.com/', '') : id}`;
                  navigator.clipboard.writeText(command);
                }}
                className="absolute top-2 right-2 px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-[10px] rounded transition-all hover:scale-105 border border-gray-700 hover:border-gray-600"
              >
                Copy
              </button>
            </div>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            {!error && (
              <Link
                href={`/marketplace/${id}`}
                className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                View Plugins →
              </Link>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors inline-flex items-center gap-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600"
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
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
