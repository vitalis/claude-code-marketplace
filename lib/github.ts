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
  // Fetch manifest and GitHub data in parallel
  const [manifestResult, githubData] = await Promise.all([
    fetchMarketplaceManifest(entry.manifestUrl),
    fetchGitHubRepoData(entry.repository),
  ]);

  if (!manifestResult.data) {
    return {
      ...entry,
      error: manifestResult.error || 'Failed to fetch marketplace data',
      lastFetched: new Date().toISOString(),
      stars: githubData?.stars,
      lastUpdated: githubData?.lastUpdated,
    };
  }

  return {
    ...entry,
    manifest: manifestResult.data,
    pluginCount: manifestResult.data.plugins.length,
    lastFetched: new Date().toISOString(),
    stars: githubData?.stars,
    lastUpdated: githubData?.lastUpdated,
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

/**
 * Fetch GitHub repository stars and last updated date
 * Uses GitHub REST API
 */
export async function fetchGitHubRepoData(repositoryUrl: string): Promise<{ stars: number; lastUpdated: string } | null> {
  const parsed = parseGitHubUrl(repositoryUrl);
  if (!parsed) return null;

  const { owner, repo } = parsed;

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Add GitHub token if available (optional, increases rate limit)
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: {
        // Revalidate every 24 hours
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error for ${owner}/${repo}:`, response.status);
      return null;
    }

    const data = await response.json();

    return {
      stars: data.stargazers_count || 0,
      lastUpdated: data.pushed_at || data.updated_at,
    };
  } catch (error) {
    console.error(`Failed to fetch GitHub data for ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Format relative time from ISO date string
 */
export function formatRelativeTime(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  } catch {
    return 'Updated recently';
  }
}

/**
 * Format star count with K/M suffix
 */
export function formatStarCount(stars: number): string {
  if (stars >= 1000000) {
    return `${(stars / 1000000).toFixed(1)}M`;
  }
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}K`;
  }
  return stars.toString();
}
