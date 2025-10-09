export interface MarketplaceOwner {
  name: string;
  email?: string;
  url?: string;
}

export interface MarketplaceMetadata {
  description?: string;
  version?: string;
  pluginRoot?: string;
}

export interface PluginAuthor {
  name: string;
  email?: string;
  url?: string;
}

export type PluginSource = string | {
  type: string;
  url: string;
  [key: string]: unknown;
};

export interface PluginEntry {
  name: string;
  source: PluginSource;
  description?: string;
  version?: string;
  author?: PluginAuthor | string;
  homepage?: string;
  repository?: string;
  license?: string;
  keywords?: string[];
  category?: string;
  tags?: string[];
  commands?: string | string[];
  agents?: string | string[];
  hooks?: string | Record<string, unknown>;
  mcpServers?: string | Record<string, unknown>;
  strict?: boolean;
}

export interface MarketplaceManifest {
  name: string;
  owner: MarketplaceOwner;
  metadata?: MarketplaceMetadata;
  plugins: PluginEntry[];
}
