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

  // Dynamic marketplace detail pages
  const marketplacePages: MetadataRoute.Sitemap = marketplacesData.marketplaces.map((marketplace) => ({
    url: `${baseUrl}/marketplace/${marketplace.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...marketplacePages];
}
