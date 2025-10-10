import { MarketplaceManifest } from '@/types/plugin';
import { FetchedMarketplace, MarketplaceEntry } from '@/types/marketplace';

/**
 * Parse a GitHub repository URL to extract owner, repo, and branch
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string; branch: string } | null {
  try {
    const urlObj = new URL(url);

    if (!urlObj.hostname.includes('github.com')) {
      return null;
    }

    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    if (pathParts.length < 2) {
      return null;
    }

    return {
      owner: pathParts[0],
      repo: pathParts[1].replace('.git', ''),
      branch: 'main', // Default branch
    };
  } catch {
    return null;
  }
}

/**
 * Construct the raw GitHub URL for a marketplace manifest
 */
export function constructManifestUrl(repoUrl: string, branch: string = 'main'): string | null {
  const parsed = parseGitHubUrl(repoUrl);

  if (!parsed) {
    return null;
  }

  return `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${branch}/.claude-plugin/marketplace.json`;
}

/**
 * Fetch a marketplace manifest from GitHub
 */
export async function fetchMarketplaceManifest(
  url: string,
  options?: RequestInit
): Promise<{ data: MarketplaceManifest | null; error?: string }> {
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorMsg = response.status === 404
        ? 'Marketplace file not found'
        : `HTTP ${response.status}`;
      console.error(`Failed to fetch marketplace manifest from ${url}: ${errorMsg}`);
      return { data: null, error: errorMsg };
    }

    const data = await response.json();
    return { data: data as MarketplaceManifest };
  } catch (error) {
    console.error(`Error fetching marketplace manifest from ${url}:`, error);
    return { data: null, error: 'Network error' };
  }
}

/**
 * Fetch and enrich a marketplace entry with its plugin data
 */
export async function fetchMarketplace(
  entry: MarketplaceEntry
): Promise<FetchedMarketplace> {
  const result = await fetchMarketplaceManifest(entry.manifestUrl);

  if (!result.data) {
    return {
      ...entry,
      error: result.error || 'Failed to fetch marketplace data',
      lastFetched: new Date().toISOString(),
    };
  }

  return {
    ...entry,
    manifest: result.data,
    pluginCount: result.data.plugins.length,
    lastFetched: new Date().toISOString(),
  };
}

/**
 * Fetch multiple marketplaces in parallel
 */
export async function fetchMarketplaces(
  entries: MarketplaceEntry[]
): Promise<FetchedMarketplace[]> {
  const promises = entries.map(entry => fetchMarketplace(entry));
  return Promise.all(promises);
}

/**
 * Validate that a marketplace manifest URL is accessible
 */
export async function validateMarketplaceUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
