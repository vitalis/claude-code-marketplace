import { MarketplaceManifest } from './plugin';

/**
 * Represents a marketplace entry in the hub
 */
export interface MarketplaceEntry {
  id: string;
  name: string;
  description: string;
  owner: {
    name: string;
    url?: string;
  };
  repository: string;
  manifestUrl: string;
  tags?: string[];
  homepage?: string;
  verified?: boolean;
  addedAt?: string;
}

/**
 * Hub metadata
 */
export interface HubMetadata {
  name: string;
  description: string;
  version: string;
}

/**
 * The main hub manifest structure
 */
export interface MarketplaceHub {
  hub: HubMetadata;
  marketplaces: MarketplaceEntry[];
}

/**
 * A marketplace with its fetched plugin data
 */
export interface FetchedMarketplace extends MarketplaceEntry {
  manifest?: MarketplaceManifest;
  pluginCount?: number;
  lastFetched?: string;
  error?: string;
}
