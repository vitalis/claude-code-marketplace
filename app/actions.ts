'use server';

import { MarketplaceHub, MarketplaceEntry, FetchedMarketplace } from '@/types/marketplace';
import { fetchMarketplaces } from '@/lib/github';
import marketplacesData from '@/.claude-plugin/marketplaces.json';

const hub = marketplacesData as MarketplaceHub;

export async function getMarketplacesData(): Promise<FetchedMarketplace[]> {
  return fetchMarketplaces(hub.marketplaces);
}

export async function getMarketplaceData(id: string): Promise<FetchedMarketplace | null> {
  const entry = hub.marketplaces.find((m) => m.id === id);
  if (!entry) return null;

  const { fetchMarketplace } = await import('@/lib/github');
  return fetchMarketplace(entry);
}

export async function getMarketplaceEntry(id: string): Promise<MarketplaceEntry | null> {
  return hub.marketplaces.find((m) => m.id === id) || null;
}
