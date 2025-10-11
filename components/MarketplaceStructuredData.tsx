import { FetchedMarketplace } from '@/types/marketplace';

interface MarketplaceStructuredDataProps {
  marketplace: FetchedMarketplace;
  marketplaceId: string;
}

export default function MarketplaceStructuredData({ marketplace, marketplaceId }: MarketplaceStructuredDataProps) {
  const baseUrl = 'https://claudecodemarketplace.com';

  // CollectionPage schema for the marketplace
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/marketplace/${marketplaceId}`,
    name: marketplace.name,
    description: marketplace.description,
    url: `${baseUrl}/marketplace/${marketplaceId}`,
    author: {
      '@type': 'Organization',
      name: marketplace.owner.name,
      url: marketplace.owner.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Claude Code Plugins',
      url: baseUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Claude Code Plugins',
      url: baseUrl,
    },
    numberOfItems: marketplace.pluginCount || 0,
  };

  // BreadcrumbList schema for navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: marketplace.name,
        item: `${baseUrl}/marketplace/${marketplaceId}`,
      },
    ],
  };

  // SoftwareSourceCode schema for the marketplace repository
  const softwareSchema = marketplace.repository ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: marketplace.name,
    description: marketplace.description,
    url: `${baseUrl}/marketplace/${marketplaceId}`,
    codeRepository: marketplace.repository,
    programmingLanguage: 'JavaScript',
    author: {
      '@type': 'Organization',
      name: marketplace.owner.name,
      url: marketplace.owner.url,
    },
    keywords: marketplace.tags?.join(', '),
  } : null;

  // Individual plugin schemas (if plugins are loaded)
  const pluginSchemas = marketplace.manifest?.plugins?.map((plugin) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: plugin.name,
    description: plugin.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: marketplace.owner.name,
      url: marketplace.owner.url,
    },
    isPartOf: {
      '@type': 'SoftwareApplication',
      name: 'Claude Code',
    },
  })) || [];

  // Combine all schemas
  const schemas = [
    collectionPageSchema,
    breadcrumbSchema,
    ...(softwareSchema ? [softwareSchema] : []),
    ...pluginSchemas.slice(0, 10), // Limit to first 10 plugins to avoid huge payload
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
