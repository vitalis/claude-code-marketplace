import { MetadataRoute } from 'next';
import marketplacesData from '@/.claude-plugin/marketplaces.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://claudecodemarketplace.com';
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Markdown pages (for LLMs/agents)
  const markdownPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/markdown/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/markdown/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic marketplace detail pages (HTML)
  const marketplacePages: MetadataRoute.Sitemap = marketplacesData.marketplaces.map((marketplace) => ({
    url: `${baseUrl}/marketplace/${marketplace.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Dynamic marketplace detail pages (Markdown)
  const markdownMarketplacePages: MetadataRoute.Sitemap = marketplacesData.marketplaces.map((marketplace) => ({
    url: `${baseUrl}/markdown/marketplace/${marketplace.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...markdownPages, ...marketplacePages, ...markdownMarketplacePages];
}
